package com.lingo.account.service;

import com.lingo.account.config.KeycloakPropsConfig;
import com.lingo.account.dto.request.ReqAccountDTO;
import com.lingo.account.dto.request.ReqUpdateAccountDTO;
import com.lingo.account.utils.Constants;
import com.lingo.common_library.exception.KeycloakException;
import jakarta.ws.rs.core.Response;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.CreatedResponseUtil;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.RoleRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class KeycloakService {
  private final Keycloak keycloak;
  private final KeycloakPropsConfig keycloakPropsConfig;

  public UserResource getUserResource(String userId) {
    RealmResource realmResource = keycloak.realm(keycloakPropsConfig.getRealm());
    return realmResource.users().get(userId);
  }

  public UserRepresentation getUserRepresentation(String userId) throws KeycloakException {
    UserRepresentation userRepresentation =
            keycloak.realm(keycloakPropsConfig.getRealm()).users().get(userId).toRepresentation();

    if (userRepresentation == null) {
      throw new KeycloakException(Constants.ErrorCode.KEYCLOAK_USER_NOT_FOUND);
    }

    return userRepresentation;
  }

  public String createNewUser(ReqAccountDTO request, List<String> roleNames) {

    RealmResource realmResource = keycloak.realm(keycloakPropsConfig.getRealm());

    UserRepresentation userRepresentation = new UserRepresentation();
    userRepresentation.setUsername(request.getUsername());
    userRepresentation.setEmail(request.getEmail());
    CredentialRepresentation credentialRepresentation = this.createPasswordCredentials(request.getPassword());
    userRepresentation.setCredentials(Collections.singletonList(credentialRepresentation));
    userRepresentation.setEnabled(true);

    if(!roleNames.isEmpty()) {
      userRepresentation.setRealmRoles(roleNames);
    }

    Response response = realmResource.users().create(userRepresentation);

    return CreatedResponseUtil.getCreatedId(response);
  }

  public CredentialRepresentation createPasswordCredentials(String password) {
    CredentialRepresentation pass = new CredentialRepresentation();
    pass.setType(CredentialRepresentation.PASSWORD);
    pass.setTemporary(false);
    pass.setValue(password);
    return pass;
  }

  public void updateKeycloakUser(String userId, ReqUpdateAccountDTO request) {
    UserRepresentation userRepresentation = getUserRepresentation(userId);

    userRepresentation.setFirstName(request.getFirstName());
    userRepresentation.setLastName(request.getLastName());

    Map<String, List<String>> attributes = userRepresentation.getAttributes();
    if (attributes == null) {
      attributes = new HashMap<>();
    }
    attributes.put("phone", Collections.singletonList(request.getPhone()));
    userRepresentation.setAttributes(attributes);

    // Update user in Keycloak
    getUserResource(userId).update(userRepresentation);
  }

  public void updateKeycloakUserAttributes(String userId, Map<String, List<String>> attributes) {
    UserRepresentation userRepresentation = getUserRepresentation(userId);
    userRepresentation.setAttributes(attributes);
    getUserResource(userId).update(userRepresentation);
  }

  public void updateEnableKeycloakUser(String userId, boolean enable){
    UserRepresentation userRepresentation = getUserRepresentation(userId);

    RealmResource realmResource = keycloak.realm(keycloakPropsConfig.getRealm());
    UserResource userResource = realmResource.users().get(userId);
    userRepresentation.setEnabled(enable);
    userResource.update(userRepresentation);
  }

  public void deleteKeycloakUser(String id) {
    keycloak.realm(keycloakPropsConfig.getRealm()).users().delete(id);
  }

  public void assignRoles(String userId, List<String> roleNames) {

    try {
      UserResource userResource = this.getUserResource(userId);

      List<RoleRepresentation> rolesToAssign = getRoles(roleNames);

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
      UserResource userResource = this.getUserResource(userId);

      List<RoleRepresentation> rolesToRemove = getRoles(roleNames);

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

  public List<RoleRepresentation> getRoles(List<String> roleNames) {
    List<RoleRepresentation> roles = roleNames.stream()
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
    return roles.isEmpty() ? null : roles ;
  }
}
