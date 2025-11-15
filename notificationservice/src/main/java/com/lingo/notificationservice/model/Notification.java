package com.lingo.notificationservice.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Entity
@Table(name = "notification")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Notification {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String userId;
  private String title;

  @ManyToOne
  @JoinColumn(name = "notofication_type_id", nullable = false)
  private NotificationType notificationType;

  private String message;
  private boolean isRead;
  private Date readAt;
  private Date createdAt;

  @PrePersist
  protected void onCreate() {
    if(createdAt == null) createdAt = new Date();
  }
}
