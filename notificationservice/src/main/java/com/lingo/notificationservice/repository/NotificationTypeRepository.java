package com.lingo.notificationservice.repository;

import com.lingo.notificationservice.model.NotificationType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface NotificationTypeRepository extends JpaRepository<NotificationType, Long> {
  Optional<NotificationType> findByName(String name);
}
