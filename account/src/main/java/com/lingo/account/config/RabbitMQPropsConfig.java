package com.lingo.account.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "accounts")
public record RabbitMQPropsConfig(
  String notificationServiceUrl,
  String notificationEventExchange,
  String newAccountQueue,
  String rabbitHost
){}

