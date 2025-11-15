package com.lingo.notificationservice.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "notification_type")
@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class NotificationType {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;   // code

  @OneToMany(mappedBy = "notificationType")
  private List<Notification> notifications;

  @OneToMany(mappedBy = "notificationType")
  private List<UserNotificationSettings> userNotificationSettings;

  private String description;
  private boolean defaultMail;
  private boolean defaultApp;
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
