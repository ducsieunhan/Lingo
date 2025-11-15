package com.lingo.notificationservice.service;

import com.lingo.common_library.exception.NotFoundException;
import com.lingo.common_library.exception.NotificationException;
import com.lingo.notificationservice.dto.mapper.NotificationMapper;
import com.lingo.notificationservice.dto.request.ReqNotificationType;
import com.lingo.notificationservice.dto.request.ReqNotificationTypePut;
import com.lingo.notificationservice.dto.response.ResNotificationType;
import com.lingo.notificationservice.model.NotificationType;
import com.lingo.notificationservice.repository.NotificationTypeRepository;
import com.lingo.notificationservice.utils.Constants;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationTypeService {
  private final NotificationTypeRepository notificationTypeRepository;
  private final NotificationMapper notificationMapper;

  public ResNotificationType createNotificationType(ReqNotificationType reqNotificationType) {
    checkIfNotificationTypeExistsByName(reqNotificationType.getName());
    NotificationType notificationType = this.buildNT(reqNotificationType);
    this.notificationTypeRepository.save(notificationType);

    return this.notificationMapper.toResNotificationType(notificationType);
  }

  public ResNotificationType updateNotificationType(ReqNotificationTypePut reqNotificationType) {
    NotificationType current = checkIfNotificationTypeNotExistsById(reqNotificationType.getId());
    current.setName(reqNotificationType.getName());
    current.setDescription(reqNotificationType.getDescription());
    current.setDefaultMail(reqNotificationType.isDefaultMail());
    current.setDefaultApp(reqNotificationType.isDefaultApp());
    this.notificationTypeRepository.save(current);

    return this.notificationMapper.toResNotificationType(current);
  }

  public void deleteNotificationType(Long id) {
    NotificationType current = checkIfNotificationTypeNotExistsById(id);
    this.notificationTypeRepository.delete(current);
  }

  public ResNotificationType getNotificationType(Long id) {
    NotificationType current = checkIfNotificationTypeNotExistsById(id);
    return this.notificationMapper.toResNotificationType(current);
  }

  public List<ResNotificationType> getAllNotificationType() {
    List<NotificationType> list = getAllNotificationTypeModel();
    return list.stream().map(this.notificationMapper::toResNotificationType).toList();
  }

  public List<NotificationType> getAllNotificationTypeModel() {
    return this.notificationTypeRepository.findAll();
  }

  public NotificationType getNotificationTypeByName(String name) {
    return this.notificationTypeRepository.findByName(name)
            .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.TYPE_NOT_EXISTS));
  }

  public NotificationType buildNT(ReqNotificationType reqNotificationType){
    return NotificationType.builder()
            .name(reqNotificationType.getName())
            .description(reqNotificationType.getDescription())
            .defaultMail(reqNotificationType.isDefaultMail())
            .defaultApp(reqNotificationType.isDefaultApp())
            .build();
  }

  public void checkIfNotificationTypeExistsByName(String name) {
    this.notificationTypeRepository.findByName(name)
            .ifPresent(notification -> {
              throw new NotificationException(Constants.ErrorCode.TYPE_EXISTS);
            });
  }

  public NotificationType checkIfNotificationTypeNotExistsById(long id) {
    return this.notificationTypeRepository.findById(id).orElseThrow(
            () -> new NotFoundException(Constants.ErrorCode.TYPE_NOT_EXISTS)
    );
  }
}
