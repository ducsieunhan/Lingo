package com.lingo.testservice.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqBroadcast {
  private long notificationTypeId;
  private String title;
  private String message;
  private String url;
}
