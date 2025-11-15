package com.lingo.notificationservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "user_notification_settings")
@Setter
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserNotificationSettings {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String userId;
  private String email;

  @ManyToOne
  @JoinColumn(name = "notofication_type_id", nullable = false)
  private NotificationType notificationType;

  private boolean emailEnabled;
  private boolean appEnabled;
  private Date createdAt;
  private Date updatedAt;

  @PrePersist
  protected void onCreate() {
    if(createdAt == null) createdAt = new Date();
  }

  @PreUpdate
  protected void onUpdate() {
    updatedAt = new Date();
  }



}
