package com.lingo.notificationservice.service;
import com.lingo.common_library.exception.NotFoundException;
import com.lingo.notificationservice.dto.mapper.NotificationMapper;
import com.lingo.notificationservice.dto.request.ReqBroadcast;
import com.lingo.notificationservice.dto.request.ReqNotificationPost;
import com.lingo.notificationservice.dto.request.ReqNotificationPut;
import com.lingo.notificationservice.dto.response.ResNotification;
import com.lingo.notificationservice.model.Notification;
import com.lingo.notificationservice.model.NotificationType;
import com.lingo.notificationservice.model.UserNotificationSettings;
import com.lingo.notificationservice.repository.NotificationRepository;
import com.lingo.notificationservice.utils.Constants;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class NotificationService {
  private final NotificationRepository notificationRepository;
  private final NotificationTypeService notificationTypeService;
  private final NotificationMapper notificationMapper;
  private final UserSettingsService userSettingsService;
  private final EmailService emailService;
  private final RabbitTemplate rabbitTemplate;

  @Value("${notification.new-notification-queue}")
  private String notificationQueue;
  /**
   * Tạo một thông báo mới, lưu vào cơ sở dữ liệu và kích hoạt gửi email nếu người dùng cho phép.
   * <p>
   * Quy trình nghiệp vụ:
   * 1. Xây dựng đối tượng Notification từ request (buildNT).
   * 2. Lấy cài đặt (Settings) của người dùng để kiểm tra xem họ có cho phép loại thông báo này không.
   * 3. Lưu thông báo vào repository (đây là flow "send in-app" chính).
   * 4. Kiểm tra xem người dùng có bật nhận email (isEmailEnabled) cho loại thông báo này không.
   * 5. Nếu email được bật:
   * - Xử lý logic đặc biệt cho email "WELCOME_USER".
   * - Chuẩn bị model cho các loại email thông báo khác (đang chờ bổ sung logic gửi).
   * 6. Nếu gửi email thất bại, một lỗi sẽ được log (log.error), nhưng phương thức
   * sẽ không ném ra exception, đảm bảo thông báo in-app vẫn được tạo thành công.
   * 
   * Các kiểu thông báo được xử lý (theo name của NotificationType) :
   * 1. WELCOME_USER 
   * 2. TEST_COMPLETED
   * 3. LESSON_REMINDER
   * 4. SYSTEM_MAINTENANCE
   * 5. COMMENT_REPLY
   * 6. COURSE_UPDATE
   *
   * @param req Đối tượng request chứa thông tin để tạo thông báo (userId, typeId, title, message).
   * @return ResNotification DTO của thông báo vừa được tạo.
   */
  public ResNotification createNotification(ReqNotificationPost req) {

    log.info("Building new notification: {}", req);

    Notification notification = this.buildNT(req);
    UserNotificationSettings userSetting = this.userSettingsService // check if user enables this type?
            .getUserSettingsByUserIdAndTypeId(req.getUserId(), req.getTypeName());
    notification.setUrl(req.getUrl());
    this.notificationRepository.save(notification);

    if (userSetting != null && userSetting.isEmailEnabled()) { // if enable for email (ex: welcome-user)
      try {
        if (notification.getNotificationType().getName().equals("WELCOME_USER")) {
          this.emailService.sendWelcome(userSetting.getEmail());
        } else {
          this.emailService.sendNotification(userSetting.getEmail(), req.getTitle(), req.getMessage());
        }
      } catch (MessagingException e) {
        log.error("Failed to send email for notification type {}: {}", req.getTypeName(), e.getMessage());
      }
    }
    return this.notificationMapper.toResNotification(notification);
  }

  @RabbitListener(queues = "${notification.new-notification-queue}")
  public void handleNotificationMessage(ReqNotificationPost req){
    this.createNotification(req);
  }

  @RabbitListener(queues = "${notification.new-broadcast-notification-queue}")
  public void handleBroadcastNotificationMessage(ReqBroadcast req){
    NotificationType type;
    try {
      type = this.notificationTypeService.checkIfNotificationTypeNotExistsById(req.getNotificationTypeId());
    } catch (Exception e) {
      log.error("NotificationType not found: '{}' ", req.getNotificationTypeId());
      return;
    }

    List<UserNotificationSettings> allUsers = this.userSettingsService.getAllSettingsForType(type.getName());

    for(UserNotificationSettings us : allUsers){
      if (us.isAppEnabled() || us.isEmailEnabled()) {
        ReqNotificationPost individualReq = new ReqNotificationPost(
                us.getUserId(),
                req.getTitle(),
                type.getId(),
                type.getName(),
                req.getMessage(),
                req.getUrl()
        );
        this.rabbitTemplate.convertAndSend(notificationQueue, individualReq);
        log.info("Broadcasting notification to user {}: {}", us.getUserId(), req);
      }
    }
  }

  public ResNotification updateNotification(ReqNotificationPut req){
    Notification notification = checkIfNotificationNotExistsById(req.getId());

    notification.setTitle(req.getTitle());
    notification.setMessage(req.getMessage());
    notification.setNotificationType(this.notificationTypeService.checkIfNotificationTypeNotExistsById(req.getNotificationTypeId()));
    this.notificationRepository.save(notification);
    return this.notificationMapper.toResNotification(notification);
  }

  public void checkReadNotification(long id){
    Notification notification = checkIfNotificationNotExistsById(id);
    if(notification.isRead()){
      log.info("Notification {} is already read.", id);
      return;
    }
    notification.setReadAt(new Date());
    notification.setRead(true);
    this.notificationRepository.save(notification);
  }


  public ResNotification getNotification(Long id){
    Notification notification = checkIfNotificationNotExistsById(id);
    return this.notificationMapper.toResNotification(notification);
  }

  public Iterable<ResNotification> getAllNotification(){
    return this.notificationRepository.findAll().stream().map(this.notificationMapper::toResNotification).toList();
  }

  /**
   * Lấy tất cả các thông báo (notification) "in-app" cho một người dùng cụ thể.
   * <p>
   * Phương thức này sẽ chỉ trả về các thông báo thuộc về các loại (NotificationType)
   * mà người dùng đã bật "appEnabled = true" trong cài đặt của họ (UserNotificationSettings).
   *
   * @param userId ID của người dùng cần truy vấn thông báo.
   * @return Một danh sách (Iterable) các ResNotification đã được lọc theo cài đặt của người dùng.
   */
  public Iterable<ResNotification> getAllNotificationByUserId(String userId){ // to show on the in-app website notification
    List<Long> typeIds = this.userSettingsService.getUserSettingsInAppEnable(userId).stream().map(us -> us.getNotificationType().getId()).toList();

    log.info("typeIds: {}", typeIds);
    if (typeIds.isEmpty()) {
      return List.of();
    }
    List<Notification> notifications = this.notificationRepository
            .findAllByUserIdAndNotificationType_IdIn(userId, typeIds);
    return notifications.stream().map(this.notificationMapper::toResNotification).toList();
  }

  public void deleteNotification(Long id){
    this.notificationRepository.deleteById(id);
  }

  public Notification checkIfNotificationNotExistsById(long id){
    return this.notificationRepository.findById(id).orElseThrow(
            () -> new NotFoundException(Constants.ErrorCode.NOTIFICATION_NOT_EXISTS)
    );
  }



  public Notification buildNT(ReqNotificationPost req){
    return Notification.builder()
            .title(req.getTitle())
            .message(req.getMessage())
            .userId(req.getUserId())
            .isRead(false)
            .notificationType(this.notificationTypeService.checkIfNotificationTypeNotExistsById(req.getNotificationTypeId()))
            .build();
  }

}
