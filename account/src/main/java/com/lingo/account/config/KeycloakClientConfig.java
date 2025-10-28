package com.lingo.account.config;

import static org.keycloak.OAuth2Constants.CLIENT_CREDENTIALS;

import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.KeycloakBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestTemplate;

@Configuration
public class KeycloakClientConfig {
  private final KeycloakPropsConfig keycloakPropsConfig;

  public KeycloakClientConfig(KeycloakPropsConfig keycloakPropsConfig) {
    this.keycloakPropsConfig = keycloakPropsConfig;
  }

  @Bean
  public Keycloak keycloak() {
    return KeycloakBuilder.builder()
            .grantType(CLIENT_CREDENTIALS)
            .serverUrl(keycloakPropsConfig.getUrl())
            .realm(keycloakPropsConfig.getRealm())
            .clientId(keycloakPropsConfig.getClientId())
            .clientSecret(keycloakPropsConfig.getClientSecret())
            .build();
  }

  @Bean
  public RestTemplate restTemplate() {
    return new RestTemplate();
  }
}