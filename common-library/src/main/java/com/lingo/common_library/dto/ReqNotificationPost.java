package com.lingo.common_library.dto;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@NoArgsConstructor
@AllArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReqNotificationPost {
    String userId;
    String title;
    long notificationTypeId;
    String typeName;
    String message;
    String url;

}
