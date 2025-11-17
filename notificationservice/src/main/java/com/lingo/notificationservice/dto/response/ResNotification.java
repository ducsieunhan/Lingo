package com.lingo.notificationservice.dto.response;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResNotification {
  private long id;
//  private String userId;
  private String title;
  private String message;
  private boolean isRead;
  private Date readAt;
  private Date createdAt;
  private String type ;
  private String typeDescription ;
  private String url;
}
