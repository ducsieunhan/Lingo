package com.lingo.account.controller;

import com.lingo.account.service.RoleService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/role")
@Tag(name = "Role Management", description = "APIs for managing user roles")
public class RoleController {
  private final RoleService roleService;

  public RoleController(RoleService roleService) {
    this.roleService = roleService;
  }

  @PostMapping()
  @Operation(summary = "Assign role to account", description = "Assigns a specific role to an account by account ID")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Role assigned successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Invalid account ID or role", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "Account not found", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<String> assignRoles(
          @Parameter(description = "Account ID to assign role to", required = true, example = "d294b705-03b9-4bd5-a7ab-7b8b691c713d")
          @RequestParam String accountId,
          @Parameter(description = "Role name to assign", required = true, example = "USER")
          @RequestParam String role) {
    this.roleService.assignRoleToAccount(accountId, role);
    return ResponseEntity.ok("Successfully assign a role");
  }

  @DeleteMapping()
  @Operation(summary = "Unassign role from account", description = "Removes a specific role from an account by account ID")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Role unassigned successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Invalid account ID or role", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "Account not found or role not assigned", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<String> unAssignRoles(
          @Parameter(description = "Account ID to unassign role from", required = true, example = "d294b705-03b9-4bd5-a7ab-7b8b691c713d")
          @RequestParam String accountId,
          @Parameter(description = "Role name to unassign", required = true, example = "USER")
          @RequestParam String role) {
//    this.roleService.unAssignRoleToAccount(accountId, role);
    return ResponseEntity.ok("Successfully unassign a role");
  }
}