package com.lingo.account.dto.request;

import lombok.Data;

@Data
public class ReqUpdateAccountDTO {
  private String id;
//  private String username;
  private String firstName;
  private String lastName;
  private String phone;
  private String[] roles;
}
