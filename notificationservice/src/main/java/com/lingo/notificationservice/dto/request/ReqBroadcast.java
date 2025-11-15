package com.lingo.notificationservice.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqBroadcast {
  private String typeName;
  private String title;
  private String message;
}
