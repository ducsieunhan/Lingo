package com.lingo.notificationservice.service;

import com.lingo.notificationservice.dto.mapper.NotificationMapper;
import com.lingo.notificationservice.dto.request.AccountMessage;
import com.lingo.notificationservice.dto.request.ReqNotificationPost;
import com.lingo.notificationservice.dto.request.ReqUserSettingsPut;
import com.lingo.notificationservice.dto.response.ResUserSettings;
import com.lingo.notificationservice.model.NotificationType;
import com.lingo.notificationservice.model.UserNotificationSettings;
import com.lingo.notificationservice.repository.UserNotificationSettingsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserSettingsService {
  private final UserNotificationSettingsRepository userSettings;
  private final NotificationTypeService notificationTypeService;
  private final NotificationMapper notificationMapper;
  private final RabbitTemplate rabbitTemplate;
  private final String WELCOME_TITLE = "WELCOME_USER";

  @Value("${notification.new-notification-queue}") // THÊM DÒNG NÀY
  private String notificationQueue;

  /**
   * Lắng nghe sự kiện (event) khi có tài khoản mới được tạo từ RabbitMQ.
   * <p>
   * Phương thức này sẽ được kích hoạt tự động khi có tin nhắn trong queue
   * "${notification.new-account-queue}".
   * <p>
   * Chức năng chính:
   * 1. Lấy tất cả các loại thông báo (NotificationType) đang có trong hệ thống.
   * 2. Tạo ra một bộ cài đặt thông báo (UserNotificationSettings) mặc định
   * cho người dùng mới dựa trên các loại đó.
   * 3. Lưu tất cả cài đặt mặc định này vào database.
   * 4. Kích hoạt flow gửi email chào mừng cho người dùng mới.
   *
   * @param accountMessage Tin nhắn từ RabbitMQ, chứa thông tin cơ bản
   * của tài khoản mới (ví dụ: userId, email).
   */
  @RabbitListener(queues = "${notification.new-account-queue}")
  public void setUpBeginnerSettings(AccountMessage accountMessage){ // this flow only for new account
    log.info("Received new account: {}", accountMessage.getEmail());
    log.info("Received new account: {}", accountMessage.getUserId());

    List<NotificationType> list = notificationTypeService.getAllNotificationTypeModel();
    List<UserNotificationSettings> userSettings = new ArrayList<>();
    for(NotificationType nt : list){
      UserNotificationSettings setting = buildSetting(nt, accountMessage.getUserId(), accountMessage.getEmail());
      userSettings.add(setting);
    }
    this.userSettings.saveAll(userSettings);
    handleSendWelcomeEmail(accountMessage);
  }

  public void updateUserSettings(ReqUserSettingsPut userSettings){
    for(ReqUserSettingsPut.NotificationTypePut type: userSettings.getNotificationTypes()){
      UserNotificationSettings user = this.userSettings.findByUserIdAndNotificationType_Name(userSettings.getUserId(), type.getName());
      user.setEmailEnabled(type.isEmailEnabled());
      user.setAppEnabled(type.isAppEnabled());
      this.userSettings.save(user);
    }
  }

  public ResUserSettings getSettingsOfUser(String userId){ // get all to VM
    List<UserNotificationSettings> listSettings = this.userSettings.findByUserId(userId);

    ResUserSettings userSettings = new ResUserSettings();
    userSettings.setUserId(userId);

    List<ResUserSettings.NotificationTypePut> settings = listSettings.stream().map(this.notificationMapper::toUserSettings).toList();
    userSettings.setNotificationTypes(settings);

    return userSettings;
  }

  public ResUserSettings getUserSettingsByUserIdAndTypeIdVM(String userId, String name){
    UserNotificationSettings userSettings = this.getUserSettingsByUserIdAndTypeId(userId, name);
    ResUserSettings res = new ResUserSettings();
    userSettings.setUserId(userId);
    ResUserSettings.NotificationTypePut type = this.notificationMapper.toUserSettings(userSettings);
    res.setNotificationTypes(List.of(type));
    return res;
  }

  public ResUserSettings getUserSettingsInAppEnableVM(String userId){
    ResUserSettings userSettings = new ResUserSettings();
    userSettings.setUserId(userId);
    List<ResUserSettings.NotificationTypePut> settings = getUserSettingsInAppEnable(userId).stream().map(this.notificationMapper::toUserSettings).toList();
    userSettings.setNotificationTypes(settings);
    return userSettings;
  }

  public List<UserNotificationSettings> getUserSettingsInAppEnable(String userId){
    return this.userSettings.findByUserIdAndAppEnabled(userId, true);
  }

  public UserNotificationSettings getUserSettingsByUserIdAndTypeId(String userId, String name){
    return this.userSettings.findByUserIdAndNotificationType_Name(userId, name);
  }

  public List<UserNotificationSettings> getAllSettingsOfUsers(){
    return this.userSettings.findAll(); // simple
  }

  public List<UserNotificationSettings> getAllSettingsForType(String typeName) {
    log.info("Fetching all user settings for type: {}", typeName);
    return this.userSettings.findAllByNotificationType_Name(typeName);
  }


  public void deleteUserSettings(String userId){
    this.userSettings.deleteAll(this.userSettings.findByUserId(userId));
  }

  public void handleSendWelcomeEmail(AccountMessage accountMessage){
    try {
      log.info("Sending welcome notification for user {}", accountMessage.getEmail());
      NotificationType welcomeType = this.notificationTypeService.getNotificationTypeByName(WELCOME_TITLE);

      ReqNotificationPost req = new ReqNotificationPost(accountMessage.getUserId(),
              WELCOME_TITLE,
              welcomeType.getId(),
              WELCOME_TITLE,
              "Welcome to Lingo");

      this.rabbitTemplate.convertAndSend(notificationQueue, req);

    } catch (Exception e) {
      log.error("Failed to sending welcome notification for user {}: {}",
              accountMessage.getEmail(), e.getMessage());
    }
  }
  public UserNotificationSettings buildSetting(NotificationType notificationType, String userId, String email){
    return UserNotificationSettings.builder()
            .userId(userId)
            .email(email)
            .notificationType(notificationType)
            .emailEnabled(notificationType.isDefaultMail())
            .appEnabled(notificationType.isDefaultApp())
            .build();

  }


}
