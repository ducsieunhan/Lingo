package com.lingo.notificationservice.controller;

import com.lingo.notificationservice.dto.request.ReqUserSettingsPut;
import com.lingo.notificationservice.dto.response.ResUserSettings;
import com.lingo.notificationservice.model.UserNotificationSettings;
import com.lingo.notificationservice.service.UserSettingsService;
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

import java.util.List;

@RestController
@RequestMapping("/api/v1/user-settings")
@RequiredArgsConstructor
@Tag(name = "User Notification Settings", description = "APIs for managing user notification preferences and settings")
public class UserSettingsController {

  private final UserSettingsService userSettingsService;

  @PutMapping
  @Operation(summary = "Update user notification settings", description = "Updates notification preferences for a specific user")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "User settings updated successfully"),
          @ApiResponse(responseCode = "400", description = "Invalid settings data", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "User not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<Void> updateUserSettings(
          @Parameter(description = "User settings update request", required = true)
          @RequestBody ReqUserSettingsPut userSettings) {
    userSettingsService.updateUserSettings(userSettings);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/{userId}")
  @Operation(summary = "Get user notification settings", description = "Retrieves notification settings for a specific user")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "User settings retrieved successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "User settings not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<ResUserSettings> getSettingsOfUser(
          @Parameter(description = "User ID", required = true, example = "d294b705-03b9-4bd5-a7ab-7b8b691c713d")
          @PathVariable String userId) {
    ResUserSettings settings = userSettingsService.getSettingsOfUser(userId);
    return ResponseEntity.ok(settings);
  }

  @GetMapping
  @Operation(summary = "Get all users notification settings", description = "Retrieves notification settings for all users (Admin only)")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "All user settings retrieved successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "403", description = "Access forbidden", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<List<UserNotificationSettings>> getAllSettingsOfUsers() {
    List<UserNotificationSettings> allSettings = userSettingsService.getAllSettingsOfUsers();
    return ResponseEntity.ok(allSettings);
  }

  @DeleteMapping("/{userId}")
  @Operation(summary = "Delete user notification settings", description = "Removes all notification settings for a specific user")
  @ApiResponses({
          @ApiResponse(responseCode = "204", description = "User settings deleted successfully"),
          @ApiResponse(responseCode = "404", description = "User settings not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<Void> deleteUserSettings(
          @Parameter(description = "User ID", required = true, example = "d294b705-03b9-4bd5-a7ab-7b8b691c713d")
          @PathVariable String userId) {
    userSettingsService.deleteUserSettings(userId);
    return ResponseEntity.noContent().build();
  }

  @GetMapping("/{userId}/app-enabled")
  @Operation(summary = "Get user settings with app enabled", description = "Retrieves notification settings for a user with app-enabled notifications only")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "User app-enabled settings retrieved successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "User settings not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<ResUserSettings> getUserSettingsInAppEnable(
          @Parameter(description = "User ID", required = true, example = "d294b705-03b9-4bd5-a7ab-7b8b691c713d")
          @PathVariable String userId) {
    ResUserSettings settings = userSettingsService.getUserSettingsInAppEnableVM(userId);
    return ResponseEntity.ok(settings);
  }

  @GetMapping("/{userId}/type/{typeName}")
  @Operation(summary = "Get user settings by type", description = "Retrieves specific notification settings for a user by notification type")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "User settings by type retrieved successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "User settings or notification type not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<ResUserSettings> getUserSettingsByUserIdAndTypeId(
          @Parameter(description = "User ID", required = true, example = "d294b705-03b9-4bd5-a7ab-7b8b691c713d")
          @PathVariable String userId,
          @Parameter(description = "Notification type name", required = true, example = "EMAIL_REMINDER")
          @PathVariable String typeName) {
    ResUserSettings setting = userSettingsService.getUserSettingsByUserIdAndTypeIdVM(userId, typeName);
    if (setting != null) {
      return ResponseEntity.ok(setting);
    }
    return ResponseEntity.notFound().build();
  }
}