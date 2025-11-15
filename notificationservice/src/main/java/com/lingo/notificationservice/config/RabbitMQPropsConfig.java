package com.lingo.notificationservice.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "notification")
public record RabbitMQPropsConfig(
  String notificationServiceUrl,
  String notificationEventExchange,
  String newAccountQueue,
  String newNotificationQueue,
  String newBroadcastNotificationQueue,
  String rabbitHost
){}


