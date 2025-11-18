package com.lingo.attempt.dto;

import lombok.AccessLevel;
import lombok.Data;
import lombok.experimental.FieldDefaults;

@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReqAttemptPut {
  String attemptId;
  String userId;
  Long score;
  Long timeTaken;
  String type;
}
