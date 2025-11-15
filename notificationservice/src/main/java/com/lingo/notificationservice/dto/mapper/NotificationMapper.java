package com.lingo.notificationservice.dto.mapper;

import com.lingo.notificationservice.dto.response.ResNotification;
import com.lingo.notificationservice.dto.response.ResNotificationType;
import com.lingo.notificationservice.dto.response.ResUserSettings;
import com.lingo.notificationservice.model.Notification;
import com.lingo.notificationservice.model.NotificationType;
import com.lingo.notificationservice.model.UserNotificationSettings;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class NotificationMapper {
  private final ModelMapper modelMapper;

  @PostConstruct
  public void init() {
    modelMapper.createTypeMap(Notification.class, ResNotification.class)
            .addMapping(n -> n.getNotificationType().getName(), ResNotification::setType)
            .addMapping(n -> n.getNotificationType().getDescription(), ResNotification::setTypeDescription);

    modelMapper.createTypeMap(UserNotificationSettings.class, ResUserSettings.NotificationTypePut.class)
            .addMapping(u -> u.getNotificationType().getName(), ResUserSettings.NotificationTypePut::setName)
            .addMapping(UserNotificationSettings::isEmailEnabled, ResUserSettings.NotificationTypePut::setEmailEnabled)
            .addMapping(UserNotificationSettings::isAppEnabled, ResUserSettings.NotificationTypePut::setAppEnabled);
  }

  public ResNotificationType toResNotificationType(NotificationType model) {
    return modelMapper.map(model, ResNotificationType.class);
  }

  public ResNotification toResNotification(Notification model) {
    return modelMapper.map(model, ResNotification.class);
  }

  public ResUserSettings.NotificationTypePut toUserSettings(UserNotificationSettings settings){
    return modelMapper.map(settings, ResUserSettings.NotificationTypePut.class);
  }
}

