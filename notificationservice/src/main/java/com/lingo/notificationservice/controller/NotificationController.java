
package com.lingo.notificationservice.controller;

import com.lingo.notificationservice.dto.request.ReqBroadcast;
import com.lingo.notificationservice.dto.request.ReqNotificationCheckedPut;
import com.lingo.notificationservice.dto.request.ReqNotificationPost;
import com.lingo.notificationservice.dto.request.ReqNotificationPut;
import com.lingo.notificationservice.dto.response.ResNotification;
import com.lingo.notificationservice.service.NotificationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/v1/notifications")
@RequiredArgsConstructor
@Tag(name = "Notifications", description = "APIs for managing user notifications and broadcasting")
public class NotificationController {

  private final NotificationService notificationService;

  @PostMapping
  @Operation(summary = "Create notification", description = "Creates a new notification for specific user(s)")
  @ApiResponses({
          @ApiResponse(responseCode = "201", description = "Notification created successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Invalid notification data", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "500", description = "Failed to create notification", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<ResNotification> createNotification(
          @Parameter(description = "Notification creation request", required = true)
          @Valid @RequestBody ReqNotificationPost reqNotificationPost) {
    ResNotification response = notificationService.createNotification(reqNotificationPost);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PutMapping
  @Operation(summary = "Update notification", description = "Updates an existing notification with new content or properties")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Notification updated successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Invalid update data", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "Notification not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<ResNotification> updateNotification(
          @Parameter(description = "Notification update request", required = true)
          @Valid @RequestBody ReqNotificationPut reqNotificationPut) {
    ResNotification response = notificationService.updateNotification(reqNotificationPut);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Delete notification", description = "Removes a notification by its ID")
  @ApiResponses({
          @ApiResponse(responseCode = "204", description = "Notification deleted successfully"),
          @ApiResponse(responseCode = "404", description = "Notification not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<Void> deleteNotification(
          @Parameter(description = "Notification ID", required = true, example = "1")
          @PathVariable Long id) {
    notificationService.deleteNotification(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{id}")
  @Operation(summary = "Get notification by ID", description = "Retrieves a specific notification by its ID")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Notification found", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "Notification not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<ResNotification> getNotification(
          @Parameter(description = "Notification ID", required = true, example = "1")
          @PathVariable Long id) {
    ResNotification response = notificationService.getNotification(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping
  @Operation(summary = "Get all notifications", description = "Retrieves all notifications in the system (Admin only)")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Notifications retrieved successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "403", description = "Access forbidden", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<List<ResNotification>> getAllNotifications() {
    Iterable<ResNotification> notifications = notificationService.getAllNotification();
    List<ResNotification> response = (List<ResNotification>) notifications;
    return ResponseEntity.ok(response);
  }

  @GetMapping("/user/{userId}")
  @Operation(summary = "Get user notifications", description = "Retrieves all notifications for a specific user based on their enabled notification types")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "User notifications retrieved successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "User not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<List<ResNotification>> getAllNotificationsByUserId(
          @Parameter(description = "User ID", required = true, example = "d294b705-03b9-4bd5-a7ab-7b8b691c713d")
          @PathVariable String userId) {
    Iterable<ResNotification> notifications = notificationService.getAllNotificationByUserId(userId);
    List<ResNotification> response = (List<ResNotification>) notifications;
    return ResponseEntity.ok(response);
  }

  @PutMapping("/mark-as-read/{id}")
  @Operation(summary = "Mark notification as read", description = "Marks a specific notification as read by the user")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Notification marked as read successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "Notification not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<String> markNotificationAsRead(
          @Parameter(description = "Notification ID", required = true, example = "1")
          @PathVariable Long id) {
    notificationService.checkReadNotification(id);
    return ResponseEntity.ok("Notification marked as read");
  }

  @PostMapping("/broadcast")
  @Operation(summary = "Broadcast notification", description = "Sends a broadcast notification to multiple users or all users")
  @ApiResponses({
          @ApiResponse(responseCode = "202", description = "Broadcast is being processed", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Invalid broadcast request", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "500", description = "Failed to initiate broadcast", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<String> broadcastNotification(
          @Parameter(description = "Broadcast notification request", required = true)
          @RequestBody ReqBroadcast req) {
    try {
      this.notificationService.handleBroadcastNotificationMessage(req);
      return ResponseEntity.accepted().body("Broadcast is being processed...");
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
              .body("Failed to initiate broadcast.");
    }
  }
}