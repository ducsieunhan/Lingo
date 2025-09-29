package com.lingo.api_gateway.controller;

import com.lingo.api_gateway.dto.identity.ReqAccountDTO;
import com.lingo.api_gateway.dto.identity.ReqLogoutDTO;
import com.lingo.api_gateway.dto.identity.ReqTokenRefreshDTO;
import com.lingo.api_gateway.dto.identity.TokenExchangeResponse;
import com.lingo.api_gateway.service.AuthService;
import com.lingo.common_library.exception.NotFoundException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.Duration;

@Slf4j
@RestController
@RequestMapping("api/v1/auth")
public class AuthController {
  private AuthService authService;

  public AuthController(AuthService authService) {
    this.authService = authService;
  }

  @PostMapping("/login")
  ResponseEntity<TokenExchangeResponse> login(@RequestBody ReqAccountDTO dto) throws NotFoundException {
    log.info("login: {}", dto);
    TokenExchangeResponse res = authService.loginAccount(dto);

    ResponseCookie cookie = ResponseCookie.from("refresh_token", res.getRefreshToken())
            .httpOnly(true)
            .secure(true)
            .sameSite("None")
            .path("/")
            .maxAge(Long.parseLong(res.getRefreshExpiresIn()))
            .build();

    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(res);
  }

  @PostMapping("/refresh")
    ResponseEntity<TokenExchangeResponse> refreshAccessToken(@CookieValue(name = "refresh_token", defaultValue = "abc") String refresh_token){
    log.info("Refresh Token: {}", refresh_token);
    TokenExchangeResponse res = authService.getRefreshAccessToken(refresh_token);

    ResponseCookie cookie = ResponseCookie.from("refresh_token", res.getRefreshToken())
            .httpOnly(true)
            .secure(true)
            .sameSite("None")
            .path("/")
            .maxAge(Long.parseLong(res.getRefreshExpiresIn()))
            .build();

    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body(res);
  }

  @PostMapping("/logout/{client_id}")
  ResponseEntity<String> logoutAccount(@CookieValue(name = "refresh_token", defaultValue = "abc") String refresh_token,
                                       @PathVariable String client_id, @RequestHeader("Authorization") String authorization){
    log.info("Refresh Token: {}", refresh_token);
    authService.postLogout(new ReqLogoutDTO(client_id, refresh_token), authorization);

    ResponseCookie cookie = ResponseCookie.from("refresh_token", null)
            .httpOnly(true)
            .secure(true)
            .sameSite("None")
            .path("/")
            .maxAge(0)
            .build();

    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString()).body("Logout successfully");
  }

  // different client id with backend
  @PostMapping("/google/{code}")
  ResponseEntity<TokenExchangeResponse> getGoogleToken(@PathVariable String code){
    log.info("google code: {}", code);
    TokenExchangeResponse res = authService.getGoogleToken(code);

    ResponseCookie cookie = ResponseCookie.from("refresh_token", res.getRefreshToken())
            .httpOnly(true)
            .secure(true)
            .sameSite("None")
            .path("/")
            .maxAge(Long.parseLong(res.getRefreshExpiresIn()))
            .build();

    return ResponseEntity.ok().header(HttpHeaders.SET_COOKIE, cookie.toString())
            .body(res);
  }


}
