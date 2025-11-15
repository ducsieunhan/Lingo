package com.lingo.notificationservice.repository;

import com.lingo.notificationservice.model.UserNotificationSettings;
import org.springframework.data.domain.Limit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Iterator;
import java.util.List;

@Repository
public interface UserNotificationSettingsRepository extends JpaRepository<UserNotificationSettings, Long> {
  UserNotificationSettings findByUserIdAndNotificationType_Name(String userId, String notificationTypeName);

  List<UserNotificationSettings> findByUserId(String userId);

  UserNotificationSettings findByUserIdAndNotificationType_Id(String userId, Long notificationTypeId);

  List<UserNotificationSettings> findByUserIdAndAppEnabled(String userId, boolean appEnabled);

  List<UserNotificationSettings> findAllByNotificationType_Name(String notificationTypeName);
}
