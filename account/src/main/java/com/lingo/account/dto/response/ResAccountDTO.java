package com.lingo.account.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDate;
import java.util.Collections;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResAccountDTO {

  private Long id;
  private String keycloakId;
  private String email;
  private String username;
  private String firstName;
  private String lastName;
  private String phone;
  private boolean enable;
  private Instant createdAt;
  private String avatar;
  private String[] roles ;
}
