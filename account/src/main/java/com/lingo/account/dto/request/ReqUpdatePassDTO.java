package com.lingo.account.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReqUpdatePassDTO {
  private String email;
  private String userId;
  private String oldPassword;
  private String newPassword;
}
