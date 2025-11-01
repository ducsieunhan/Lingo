package com.lingo.account.controller;

import com.lingo.account.service.RoleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/role")
public class RoleController {
  private final RoleService roleService;

  public RoleController(RoleService roleService) {
    this.roleService = roleService;
  }
  @PostMapping()
  public ResponseEntity<String> assignRoles(@RequestParam String accountId, @RequestParam String role) {
    this.roleService.assignRoleToAccount(accountId, role);
    return ResponseEntity.ok("Successfully assign a role");
  }

//  @DeleteMapping()
//  public ResponseEntity<String> unAssignRoles(@RequestParam String accountId, @RequestParam String role) {
//    this.roleService.unAssignRoleToAccount(accountId, role);
//    return ResponseEntity.ok("Successfully unassign a role");
//  }
}
