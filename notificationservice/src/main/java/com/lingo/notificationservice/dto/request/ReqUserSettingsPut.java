package com.lingo.notificationservice.dto.request;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReqUserSettingsPut {
  String userId;
  List<NotificationTypePut> notificationTypes;

  @Data
  @NoArgsConstructor
  @AllArgsConstructor
  @FieldDefaults(level = AccessLevel.PRIVATE)
  public static class NotificationTypePut {
    String name;
    boolean emailEnabled;
    boolean appEnabled;
  }
}
