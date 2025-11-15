package com.lingo.account.dto.request;

import lombok.Data;

@Data
public class AccountMessage {
  private String userId;
  private String email;
  private String username;
}
