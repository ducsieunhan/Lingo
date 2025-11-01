package com.lingo.account.utils;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class KeycloakUtils {

  @Value("${idp.url:http://localhost:8180}")
  private String serverUrl;

  @Value("${idp.realm:Lingo}")
  private String realm;

  @Value("${idp.client-id:Lingo}")
  private String clientId;

  @Value("${idp.client-secret:JK7Mc23PlhXx3TSCVlC3wKhq7PmohD8I}")
  private String clientSecret;

  @Value("${idp.username:admin}")
  private String username;

  @Value("${idp.password:admin}")
  private String password;

  public Keycloak getKeycloakInstance() {
    return KeycloakBuilder.builder()
            .serverUrl(serverUrl)
            .realm(realm)
            .clientId(clientId)
            .clientSecret(clientSecret)
            .grantType("client_credentials")
            .build();
  }

}