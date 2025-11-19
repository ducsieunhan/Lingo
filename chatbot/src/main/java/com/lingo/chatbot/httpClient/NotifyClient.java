package com.lingo.chatbot.httpClient;


import com.lingo.chatbot.model.ReqBroadCast;
import com.lingo.common_library.dto.ReqNotificationPost;
import com.lingo.common_library.dto.ResNotification;
import io.swagger.v3.oas.annotations.Parameter;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service",url = "http://localhost:8080/api/v1/notifications")
public interface NotifyClient {
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResNotification> createNotification(
            @Valid @RequestBody ReqNotificationPost reqNotificationPost);
    @PostMapping("/broadcast")
    public ResponseEntity<String> broadcastNotification(
            @Parameter(description = "Broadcast notification request", required = true)
            @RequestBody ReqBroadCast req);
}
