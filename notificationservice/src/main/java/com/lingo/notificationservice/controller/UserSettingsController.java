
package com.lingo.notificationservice.controller;

import com.lingo.notificationservice.dto.request.ReqUserSettingsPut;
import com.lingo.notificationservice.dto.response.ResUserSettings;
import com.lingo.notificationservice.model.UserNotificationSettings;
import com.lingo.notificationservice.service.UserSettingsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user-settings")
@RequiredArgsConstructor
public class UserSettingsController {

  private final UserSettingsService userSettingsService;

  @PutMapping
  public ResponseEntity<Void> updateUserSettings(@RequestBody ReqUserSettingsPut userSettings) {
    userSettingsService.updateUserSettings(userSettings);
    return ResponseEntity.ok().build();
  }

  @GetMapping("/{userId}")
  public ResponseEntity<ResUserSettings> getSettingsOfUser(@PathVariable String userId) {
    ResUserSettings settings = userSettingsService.getSettingsOfUser(userId);
    return ResponseEntity.ok(settings);
  }

  @GetMapping
  public ResponseEntity<List<UserNotificationSettings>> getAllSettingsOfUsers() {
    List<UserNotificationSettings> allSettings = userSettingsService.getAllSettingsOfUsers();
    return ResponseEntity.ok(allSettings);
  }

  @DeleteMapping("/{userId}")
  public ResponseEntity<Void> deleteUserSettings(@PathVariable String userId) {
    userSettingsService.deleteUserSettings(userId);
    return ResponseEntity.noContent().build();
  }

  // Thêm endpoint để lấy settings với app enabled
  @GetMapping("/{userId}/app-enabled")
  public ResponseEntity<ResUserSettings> getUserSettingsInAppEnable(@PathVariable String userId) {
    ResUserSettings settings = userSettingsService.getUserSettingsInAppEnableVM(userId);
    return ResponseEntity.ok(settings);
  }

  // Thêm endpoint để lấy setting cụ thể theo userId và type name
  @GetMapping("/{userId}/type/{typeName}")
  public ResponseEntity<ResUserSettings> getUserSettingsByUserIdAndTypeId(
          @PathVariable String userId,
          @PathVariable String typeName) {
    ResUserSettings setting = userSettingsService.getUserSettingsByUserIdAndTypeIdVM(userId, typeName);
    if (setting != null) {
      return ResponseEntity.ok(setting);
    }
    return ResponseEntity.notFound().build();
  }
}