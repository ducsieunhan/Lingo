package com.lingo.api_gateway.service;

import com.lingo.api_gateway.dto.identity.*;
import feign.QueryMap;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "identity-service", url = "${idp.url}")
public interface AuthenClient {

  @PostMapping(value = "/realms/Lingo/protocol/openid-connect/token",
          consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
          produces = MediaType.APPLICATION_JSON_VALUE
  )
  TokenExchangeResponse exchangeClientToken(TokenExchangeRequest token);

  @PostMapping(value = "/realms/Lingo/protocol/openid-connect/token",
          consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
          produces = MediaType.APPLICATION_JSON_VALUE
  )
  TokenExchangeResponse refreshAccessToken(RefreshTokenExchangeRequest token);

  @PostMapping(value = "/realms/Lingo/protocol/openid-connect/token",
          consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE,
          produces = MediaType.APPLICATION_JSON_VALUE
  )
  TokenExchangeResponse exchangeGoogleToken(GoogleTokenRequest token);

  @PostMapping(value = "/realms/Lingo/protocol/openid-connect/logout",
          consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE
  )
  String logoutAccount(@RequestParam("client_id") String clientId,
                       @RequestParam("refresh_token") String refreshToken,
                       @RequestHeader("Authorization") String authorization);



}
