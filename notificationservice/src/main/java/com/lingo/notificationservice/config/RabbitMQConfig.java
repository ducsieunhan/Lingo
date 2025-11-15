package com.lingo.notificationservice.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
public class RabbitMQConfig {
  private final RabbitMQPropsConfig properties;

  @Bean
  DirectExchange exchange() {
    return new DirectExchange(properties.notificationEventExchange());
  }

  @Bean
  public Queue newAccountQueue(){
    return new Queue(properties.newAccountQueue(), true);
  }

  @Bean
  Binding newAccountQueueBinding(){
    return BindingBuilder.bind(newAccountQueue()).to(exchange()).with(properties.newAccountQueue());
  }

  @Bean
  public Queue newNotificationQueue(){
    return new Queue(properties.newNotificationQueue(), true);
  }

  @Bean
  Binding newNotificationQueueBinding(){
    return BindingBuilder.bind(newNotificationQueue()).to(exchange()).with(properties.newNotificationQueue());
  }

  @Bean
  public Queue newBroadcastQueue(){
    return new Queue(properties.newBroadcastNotificationQueue(), true);
  }

  @Bean
  Binding newBroadcastQueueBinding(){
    return BindingBuilder.bind(newBroadcastQueue()).to(exchange()).with(properties.newBroadcastNotificationQueue());
  }

  @Bean
  public ConnectionFactory connectionFactory() {
    CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
    connectionFactory.setHost("localhost");
    connectionFactory.setPort(5672);
    connectionFactory.setUsername("admin");
    connectionFactory.setPassword("123456");
    connectionFactory.setVirtualHost("/");
    return connectionFactory;
  }

  @Bean
  public MessageConverter jsonMessageConverter(ObjectMapper objectMapper) {
    return new Jackson2JsonMessageConverter(objectMapper);
  }

  @Bean
  RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
    RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
    rabbitTemplate.setMessageConverter(new Jackson2JsonMessageConverter());
    return rabbitTemplate;
  }
}
