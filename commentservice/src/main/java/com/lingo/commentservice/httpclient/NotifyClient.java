package com.lingo.commentservice.httpclient;


import com.lingo.common_library.dto.ReqNotificationPost;
import com.lingo.common_library.dto.ResNotification;
import jakarta.validation.Valid;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "notification-service",url = "http://localhost:9005/api/v1/notifications")
public interface NotifyClient {
    @PostMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ResNotification> createNotification(
            @Valid @RequestBody ReqNotificationPost reqNotificationPost);
}
