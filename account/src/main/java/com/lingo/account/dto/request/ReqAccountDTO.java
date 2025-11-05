package com.lingo.account.dto.request;

import lombok.Data;

@Data
public class  ReqAccountDTO {
  private String email;
  private String username;
  private String firstName;
  private String lastName;
  private String password;
//  private String[] roles;
  private String[] roles = new String[0];

}
