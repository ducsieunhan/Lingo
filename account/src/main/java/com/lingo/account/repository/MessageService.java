package com.lingo.account.repository;

import com.lingo.account.dto.request.AccountMessage;
import com.lingo.account.model.Account;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

public interface MessageService {
  public void sendMessage(Account account);
}

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
class MessageServiceImpl implements MessageService {
  private final RabbitTemplate template;
  private final Queue queue;


  @Override
  public void sendMessage(Account account) {

    log.info("Message starting send");

    AccountMessage message = new AccountMessage();
    message.setUserId(account.getKeycloakId());
    message.setEmail(account.getEmail());
    message.setUsername(account.getUsername());

    log.info("Sending message with queue name : {}" , queue.getName());
    log.info("Sending...");

    try{
      template.convertAndSend(queue.getName(), message);
    } catch (Exception e){
      log.error("Error when sending message : {}", e.getMessage());
    }



  }
}