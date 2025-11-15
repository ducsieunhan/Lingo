
package com.lingo.notificationservice.controller;

import com.lingo.notificationservice.dto.request.ReqNotificationType;
import com.lingo.notificationservice.dto.request.ReqNotificationTypePut;
import com.lingo.notificationservice.dto.response.ResNotificationType;
import com.lingo.notificationservice.service.NotificationTypeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/notification-types")
@RequiredArgsConstructor
public class NotificationTypeController {

  private final NotificationTypeService notificationTypeService;

  @PostMapping
  public ResponseEntity<ResNotificationType> createNotificationType(
          @Valid @RequestBody ReqNotificationType reqNotificationType) {
    ResNotificationType response = notificationTypeService.createNotificationType(reqNotificationType);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PutMapping
  public ResponseEntity<ResNotificationType> updateNotificationType(
          @Valid @RequestBody ReqNotificationTypePut reqNotificationType) {
    ResNotificationType response = notificationTypeService.updateNotificationType(reqNotificationType);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteNotificationType(@PathVariable Long id) {
    notificationTypeService.deleteNotificationType(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{id}")
  public ResponseEntity<ResNotificationType> getNotificationType(@PathVariable Long id) {
    ResNotificationType response = notificationTypeService.getNotificationType(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping
  public ResponseEntity<List<ResNotificationType>> getAllNotificationTypes() {
    List<ResNotificationType> response = notificationTypeService.getAllNotificationType();
    return ResponseEntity.ok(response);
  }
}