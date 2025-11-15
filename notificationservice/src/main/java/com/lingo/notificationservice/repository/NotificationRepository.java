package com.lingo.notificationservice.repository;

import com.lingo.notificationservice.dto.response.ResNotification;
import com.lingo.notificationservice.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {

  List<Notification> findAllByUserIdAndNotificationType_IdIn(String userId, List<Long> notificationTypeIds);
}
