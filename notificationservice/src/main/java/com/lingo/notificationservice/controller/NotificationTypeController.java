package com.lingo.notificationservice.controller;

import com.lingo.notificationservice.dto.request.ReqNotificationType;
import com.lingo.notificationservice.dto.request.ReqNotificationTypePut;
import com.lingo.notificationservice.dto.response.ResNotificationType;
import com.lingo.notificationservice.service.NotificationTypeService;
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
@RequestMapping("/api/v1/notification-types")
@RequiredArgsConstructor
@Tag(name = "Notification Types", description = "APIs for managing notification types and categories")
public class NotificationTypeController {

  private final NotificationTypeService notificationTypeService;

  @PostMapping
  @Operation(summary = "Create notification type", description = "Creates a new notification type with specified properties")
  @ApiResponses({
          @ApiResponse(responseCode = "201", description = "Notification type created successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Invalid notification type data", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "409", description = "Notification type already exists", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<ResNotificationType> createNotificationType(
          @Parameter(description = "Notification type creation request", required = true)
          @Valid @RequestBody ReqNotificationType reqNotificationType) {
    ResNotificationType response = notificationTypeService.createNotificationType(reqNotificationType);
    return new ResponseEntity<>(response, HttpStatus.CREATED);
  }

  @PutMapping
  @Operation(summary = "Update notification type", description = "Updates an existing notification type with new properties")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Notification type updated successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Invalid update data", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "Notification type not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<ResNotificationType> updateNotificationType(
          @Parameter(description = "Notification type update request", required = true)
          @Valid @RequestBody ReqNotificationTypePut reqNotificationType) {
    ResNotificationType response = notificationTypeService.updateNotificationType(reqNotificationType);
    return ResponseEntity.ok(response);
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Delete notification type", description = "Removes a notification type by its ID")
  @ApiResponses({
          @ApiResponse(responseCode = "204", description = "Notification type deleted successfully"),
          @ApiResponse(responseCode = "404", description = "Notification type not found", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "409", description = "Cannot delete notification type with existing references", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<Void> deleteNotificationType(
          @Parameter(description = "Notification type ID", required = true, example = "1")
          @PathVariable Long id) {
    notificationTypeService.deleteNotificationType(id);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{id}")
  @Operation(summary = "Get notification type by ID", description = "Retrieves a specific notification type by its ID")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Notification type found", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "Notification type not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<ResNotificationType> getNotificationType(
          @Parameter(description = "Notification type ID", required = true, example = "1")
          @PathVariable Long id) {
    ResNotificationType response = notificationTypeService.getNotificationType(id);
    return ResponseEntity.ok(response);
  }

  @GetMapping
  @Operation(summary = "Get all notification types", description = "Retrieves all available notification types")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Notification types retrieved successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<List<ResNotificationType>> getAllNotificationTypes() {
    List<ResNotificationType> response = notificationTypeService.getAllNotificationType();
    return ResponseEntity.ok(response);
  }
}