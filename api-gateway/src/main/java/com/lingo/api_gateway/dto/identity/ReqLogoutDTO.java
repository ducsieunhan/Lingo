package com.lingo.api_gateway.dto.identity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqLogoutDTO {
  private String client_id;
  private String refresh_token;
}
