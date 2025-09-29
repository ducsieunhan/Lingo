package com.lingo.api_gateway.service;

import com.lingo.api_gateway.dto.identity.*;
import com.lingo.api_gateway.utils.Constants;
import com.lingo.common_library.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
  private final AuthenClient authenClient;

  @Value("${idp.client-id}")
  @NonFinal
  String clientId;

  @Value("${idp.client-secret}")
  @NonFinal
  String clientSecret;

  public TokenExchangeResponse loginAccount(ReqAccountDTO request) throws NotFoundException{
    log.info("loginAccount: {}", request);
    try {
      TokenExchangeResponse res = this.authenClient.exchangeClientToken(
              new TokenExchangeRequest("password", clientId, clientSecret,
                      "openid", request.getUsername(), request.getPassword()));
      return res;
    } catch (Exception e) {
      log.error("loginAccount error: {}", e.getMessage());
      throw new NotFoundException(Constants.ErrorCode.LOGIN_NOT_SUCCESS);
    }
  }

//  public TokenExchangeResponse getRefreshAccessToken(ReqTokenRefreshDTO request) {
    public TokenExchangeResponse getRefreshAccessToken(String refreshToken) {
    log.info("loginAccount: {}", refreshToken);
    try {
      TokenExchangeResponse res = this.authenClient.refreshAccessToken(
              new RefreshTokenExchangeRequest("refresh_token",
                      clientId, clientSecret, refreshToken));

      return res;
    } catch (RuntimeException e) {
      log.error("loginAccount error: {}", e.getMessage());
      throw new RuntimeException(Constants.ErrorCode.LOGIN_NOT_SUCCESS);
    }

  }

  public void postLogout(ReqLogoutDTO req, String authorization) {
    log.info("loginAccount: {}", req.getRefresh_token());
    try {
      String clientId = req.getClient_id();
      String refreshToken = req.getRefresh_token();

      String res = this.authenClient.logoutAccount(
              clientId,
              refreshToken,
              authorization
      );
      log.info("loginAccount: {}", res);

    } catch (RuntimeException e) {
      log.error("loginAccount error: {}", e.getMessage());
      throw new RuntimeException(Constants.ErrorCode.LOGOUT_NOT_SUCCESS);
    }

  }

  public TokenExchangeResponse getGoogleToken(String code) {
    log.info("loginAccount: {}", code);
    try {
      TokenExchangeResponse res = this.authenClient.exchangeGoogleToken(
              new GoogleTokenRequest("authorization_code",
                      clientId, clientSecret, code, "http://localhost:5173/"));
//      log.info("Response: {}", res);
      return res;
    } catch (RuntimeException e) {
      log.error("loginAccount error: {}", e.getMessage());
      throw new RuntimeException(Constants.ErrorCode.LOGIN_NOT_SUCCESS);
    }

  }




}
