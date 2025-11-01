package com.lingo.account.config;

import lombok.Getter;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Getter
@Setter
@Configuration
@ConfigurationProperties(value = "idp")
public class KeycloakPropsConfig {
  private String url;
  private String realm;
  private String clientId;
  private String clientSecret;
}