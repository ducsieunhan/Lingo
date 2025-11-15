package com.lingo.notificationservice.controller;

import com.lingo.notificationservice.dto.request.ReqBroadcast;
import com.lingo.notificationservice.dto.request.ReqNotificationCheckedPut;
import com.lingo.notificationservice.dto.request.ReqNotificationPost;
import com.lingo.notificationservice.dto.request.ReqNotificationPut;
import com.lingo.notificationservice.dto.response.ResNotification;
import com.lingo.notificationservice.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

  private final NotificationService notificationService;

  @PostMapping
  public ResponseEntity<ResNotification> createNotification(
          @Valid @RequestBody ReqNotificationPost reqNotificationPost) {
    ResNotification response = notificationService.createNotification(reqNotificationPost);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PutMapping
  public ResponseEntity<ResNotification> updateNotification(
          @Valid @RequestBody ReqNotificationPut reqNotificationPut) {
    ResNotification response = notificationService.updateNotification(reqNotificationPut);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteNotification(@PathVariable Long id) {
    notificationService.deleteNotification(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{id}")
  public ResponseEntity<ResNotification> getNotification(@PathVariable Long id) {
    ResNotification response = notificationService.getNotification(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping
  public ResponseEntity<List<ResNotification>> getAllNotifications() {
    Iterable<ResNotification> notifications = notificationService.getAllNotification();
    List<ResNotification> response = (List<ResNotification>) notifications;
    return ResponseEntity.ok(response);
  }

  // endpoint để lấy tất cả thông báo của một user
  @GetMapping("/user/{userId}")
  public ResponseEntity<List<ResNotification>> getAllNotificationsByUserId(@PathVariable String userId) {
    Iterable<ResNotification> notifications = notificationService.getAllNotificationByUserId(userId);
    List<ResNotification> response = (List<ResNotification>) notifications;
    return ResponseEntity.ok(response);
  }

  @PutMapping("/mark-as-read/{id}")
  public ResponseEntity<String> markNotificationAsRead(@PathVariable Long id) {
    notificationService.checkReadNotification(id);
    return ResponseEntity.ok("Notification marked as read");
  }


  @PostMapping("/broadcast")
  public ResponseEntity<String> broadcastNotification(@RequestBody ReqBroadcast req) {
    try {
      this.notificationService.handleBroadcastNotificationMessage(req);
      return ResponseEntity.accepted().body("Broadcast is being processed...");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body("Failed to initiate broadcast.");
    }
  }
}