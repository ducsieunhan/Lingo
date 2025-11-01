package com.lingo.account.service;

import com.lingo.account.config.KeycloakPropsConfig;
import com.lingo.account.model.Account;
import com.lingo.account.model.Role;
import com.lingo.account.repository.AccountRepository;
import com.lingo.account.repository.RoleRepository;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.RoleRepresentation;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class RoleService {
  private final Keycloak keycloak;
  private final KeycloakPropsConfig keycloakPropsConfig;
  private final RoleRepository roleRepository;
  private final AccountRepository accountRepository;

  public void assignRoles(String userId, List<String> roleNames) {

    try {
      UserResource userResource = keycloak.realm(keycloakPropsConfig.getRealm())
              .users().get(userId);

      List<RoleRepresentation> rolesToAssign = roleNames.stream()
              .map(roleName -> {
                try {
                  return keycloak.realm(keycloakPropsConfig.getRealm())
                          .roles().get(roleName).toRepresentation();
                } catch (Exception e) {
                  log.error("Role '{}' not found in Keycloak", roleName);
                  return null;
                }
              })
              .filter(Objects::nonNull)
              .collect(Collectors.toList());

      if (!rolesToAssign.isEmpty()) {
        userResource.roles().realmLevel().add(rolesToAssign);
        log.info("Successfully assigned roles {} to user: {}", roleNames, userId);
      } else {
        log.warn("No valid roles found to assign to user: {}", userId);
      }

    } catch (Exception e) {
      log.error("Failed to assign roles {} to user: {}", roleNames, userId, e);
      throw new RuntimeException("Failed to assign roles in Keycloak", e);
    }
  }

  public void unAssignRoles(String userId, List<String> roleNames) {
    try {
      UserResource userResource = keycloak.realm(keycloakPropsConfig.getRealm())
              .users().get(userId);

      List<RoleRepresentation> rolesToRemove = roleNames.stream()
              .map(roleName -> {
                try {
                  return keycloak.realm(keycloakPropsConfig.getRealm())
                          .roles().get(roleName).toRepresentation();
                } catch (Exception e) {
                  log.error("Role '{}' not found in Keycloak", roleName);
                  return null;
                }
              })
              .filter(Objects::nonNull)
              .collect(Collectors.toList());

      if (!rolesToRemove.isEmpty()) {
        userResource.roles().realmLevel().remove(rolesToRemove);
        log.info("Successfully removed roles {} from user: {}", roleNames, userId);
      } else {
        log.warn("No valid roles found to remove from user: {}", userId);
      }

    } catch (Exception e) {
      log.error("Failed to remove roles {} from user: {}", roleNames, userId, e);
      throw new RuntimeException("Failed to remove roles in Keycloak", e);
    }
  }

  public void assignRolesToAccount(String keycloakId, List<String> newRoleNames) {
    try {
      Account account = (Account) accountRepository.findByKeycloakId(keycloakId)
              .orElseThrow(() -> new NotFoundException("Account not found with keycloakId: " + keycloakId));

      List<String> currentRoleNames = account.getRoles() != null ?
              account.getRoles().stream().map(Role::getName).toList() :
              new ArrayList<>();

      // Tìm roles cần thêm (có trong newRoles nhưng không có trong currentRoles)
      List<String> rolesToAdd = newRoleNames.stream()
              .filter(roleName -> !currentRoleNames.contains(roleName))
              .toList();

      // Tìm roles cần xóa (có trong currentRoles nhưng không có trong newRoles)
      List<String> rolesToRemove = currentRoleNames.stream()
              .filter(roleName -> !newRoleNames.contains(roleName))
              .toList();

      // Thực hiện assign roles mới
      if (!rolesToAdd.isEmpty()) {
        assignRoles(keycloakId, rolesToAdd);
        log.info("Adding roles {} to account: {}", rolesToAdd, keycloakId);
      }

      // Thực hiện unassign roles cũ
      if (!rolesToRemove.isEmpty()) {
        unAssignRoles(keycloakId, rolesToRemove);
        log.info("Removing roles {} from account: {}", rolesToRemove, keycloakId);
      }

      // Cập nhật database với danh sách roles mới
      List<Role> newRoles = newRoleNames.stream()
              .map(roleRepository::findByName)
              .filter(Objects::nonNull)
              .toList();

      account.setRoles(new ArrayList<>(newRoles));
      accountRepository.save(account);

      log.info("Successfully updated roles for account: {} with roles: {}", keycloakId, newRoleNames);

    } catch (Exception e) {
      log.error("Failed to update roles for account: {}", keycloakId, e);
      throw new RuntimeException("Failed to update account roles", e);
    }

  }

  public void assignRole(String userId, List<String> roleName) {
    assignRoles(userId, roleName);
  }


  public void assignRoleToAccount(String keycloakId, String roleName) {
    assignRolesToAccount(keycloakId, Collections.singletonList(roleName));
  }


}