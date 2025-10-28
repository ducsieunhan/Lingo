package com.lingo.account.service;

import com.lingo.account.config.KeycloakPropsConfig;
import com.lingo.account.dto.identity.ReqAccount;
import com.lingo.account.dto.identity.TokenExchangeRequest;
import com.lingo.account.dto.request.*;
import com.lingo.account.dto.response.ResAccountDTO;
import com.lingo.account.dto.response.ResPaginationDTO;
import com.lingo.account.mapper.AccountMapper;
import com.lingo.account.model.Account;
import com.lingo.account.model.Role;
import com.lingo.account.repository.AccountRepository;
import com.lingo.account.repository.AccountSpecifications;
import com.lingo.account.repository.IdentityClient;
import com.lingo.account.repository.RoleRepository;
import com.lingo.account.utils.Constants;
import com.lingo.common_library.exception.CreateUserException;
import com.lingo.common_library.exception.KeycloakException;
import com.lingo.common_library.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.experimental.NonFinal;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.admin.client.resource.RealmResource;
import org.keycloak.admin.client.resource.UserResource;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AccountService {
  private final AccountRepository accountRepository;
  private final IdentityClient identityClient;
  private final AccountMapper accountMapper;
  private final RoleService roleService;
  private final RoleRepository roleRepository;
  private final Keycloak keycloak;
  private final KeycloakPropsConfig keycloakPropsConfig;
  private final String USER = "USER";
  private final RestTemplate restTemplate;

  @Value("${idp.client-id}")
  @NonFinal
  String clientId;

  @Value("${idp.url}")
  @NonFinal
  String serverUrl;

  @Value("${idp.realm}")
  @NonFinal
  String realm;

  @Value("${idp.client-secret}")
  @NonFinal
  String clientSecret;

  public ResAccountDTO createNewAccount(ReqAccountDTO request) throws CreateUserException{

    if (this.accountRepository.findByUsername(request.getUsername()).isPresent()){
      throw new CreateUserException(Constants.ErrorCode.USER_NAME_ALREADY_EXITED);
    }

    if (this.accountRepository.findByEmail(request.getUsername()).isPresent()){
      throw new CreateUserException(Constants.ErrorCode.EMAIL_ALREADY_EXITED);
    }

      var createAccountRes = identityClient.createAccount(
              "Bearer " + getClientToken(),
              ReqAccount.builder()
                      .username(request.getUsername())
                      .firstName(request.getFirstName())
                      .lastName(request.getLastName())
                      .email(request.getEmail())
                      .enabled(true)
                      .emailVerified(false)
                      .credentials(List.of(ReqAccount.Credential.builder()
                              .type("password")
                              .temporary(false)
                              .value(request.getPassword())
                              .build()))
                      .build());

      String userId = extractUserId(createAccountRes);
      Account account = accountMapper.toModel(request, userId);

      List<String> roleNames = request.getRoles().length > 0 && request.getRoles()[0] != null
            ? Arrays.asList(request.getRoles())
            : List.of(USER);

      if (roleNames.size() > 1) {
        this.roleService.assignRole(userId, roleNames);
      } else {
        this.roleService.assignRole(userId, roleNames);
      }

      List<Role> roles = this.roleRepository.findAllByNameIn(roleNames);
      log.info("KEYCLOAK, User created with id: {}", userId);

      account.setRoles(roles);
      this.accountRepository.save(account);
      return accountMapper.toResDTO(account);

  }

  public ResAccountDTO getAccount(String id) throws NotFoundException {
    Account account = (Account) this.accountRepository.findByKeycloakId(id)
            .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.USER_NOT_FOUND));
    return accountMapper.toResDTO(account);
  }

  public ResPaginationDTO getAllAccounts(
          int pageNo,
          int pageSize,
          String username,
          String email,
          List<String> roles,
//          boolean enable,
          Long from , Long to
  ) {

    Pageable pageable = PageRequest.of(pageNo, pageSize);

    username = (username != null && username.trim().isEmpty()) ? null : username;
    email = (email != null && email.trim().isEmpty()) ? null : email;
    roles = (roles != null && roles.isEmpty()) ? null : roles;


    Specification<Account> spec = Specification.where(AccountSpecifications.hasUsername(username))
            .or(AccountSpecifications.hasEmail(email))
            .and(AccountSpecifications.hasRoles(roles))
//            .and(AccountSpecifications.isEnable(enable))
            .and(AccountSpecifications.createdBetween(from, to));

    Page<Account> accountPage = this.accountRepository.findAll(spec, pageable);

    ResPaginationDTO res = new ResPaginationDTO();
    ResPaginationDTO.Meta meta = new ResPaginationDTO.Meta();

    meta.setPage(pageable.getPageNumber());
    meta.setPageSize(pageable.getPageSize());

    meta.setPages(accountPage.getTotalPages());
    meta.setTotal(accountPage.getTotalElements());

    res.setMeta(meta);

    res.setResult(accountPage.getContent().stream().map(accountMapper::toResDTO).toList());

    return res;
  }

  public void deleteAccount(String id) {
    Account account = (Account) this.accountRepository.findByKeycloakId(id)
            .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.USER_NOT_FOUND));

    try {
      keycloak.realm(keycloakPropsConfig.getRealm()).users().delete(account.getKeycloakId());
      this.accountRepository.delete(account);
    } catch (Exception e) {
      throw new NotFoundException(Constants.ErrorCode.ERROR_DELETING_ACCOUNT);
    }
  }

  public void restoreAccount(String id) {
    updateEnableAccount(id, true);
  }

  public ResAccountDTO updateAccount(ReqUpdateAccountDTO request) {
    Account account = (Account) this.accountRepository.findByKeycloakId(request.getId())
            .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.USER_NOT_FOUND));

    // Update Keycloak user representation
    updateKeycloakUser(request.getId(), request);

    // Update local account
    account.setFirstName(request.getFirstName());
    account.setLastName(request.getLastName());
    account.setPhone(request.getPhone());

    if (request.getRoles() != null && request.getRoles().length > 0) {
      this.roleService.assignRolesToAccount(request.getId(), List.of(request.getRoles()));
    }

    this.accountRepository.save(account);
    log.info("Updated account: {}", account.getId());

    return accountMapper.toResDTO(account);
  }


  public Account updateEnableAccount(String id, boolean enable) {
    UserRepresentation userRepresentation =
            keycloak.realm(keycloakPropsConfig.getRealm()).users().get(id).toRepresentation();
    Account account = (Account) this.accountRepository.findByKeycloakId(id)
            .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.USER_NOT_FOUND));

    if (userRepresentation != null) {
      RealmResource realmResource = keycloak.realm(keycloakPropsConfig.getRealm());
      UserResource userResource = realmResource.users().get(id);
      userRepresentation.setEnabled(enable);
      userResource.update(userRepresentation);

      account.setEnable(enable);
      return this.accountRepository.save(account);
    } else {
      throw new NotFoundException(Constants.ErrorCode.USER_NOT_FOUND);
    }
  }

  public ResAccountDTO createAccountGG(ReqAccountGGDTO req) {
    return this.accountRepository.findByEmail(req.getEmail())
            .map(existingAccount -> {
              log.info("Account with email {} already exists, returning existing account", req.getEmail());
              return accountMapper.toResDTO(existingAccount);
            })
            .orElseGet(() -> {
              Account account = new Account();
              account.setEmail(req.getEmail());
              account.setKeycloakId(req.getSub());
              account.setEnable(true);
              account.setUsername(req.getEmail());
              this.roleService.assignRole(req.getSub(), Collections.singletonList(USER)); // assign in keycloak
              account.setRoles(this.roleRepository.findAllByNameIn(List.of(USER)));
              this.accountRepository.save(account);
              log.info("Created new account for email {}", req.getEmail());
              return accountMapper.toResDTO(account);
            });
  }

  public void updateAvatar(ReqAvatarDTO req) throws KeycloakException, NotFoundException {
    Account account = (Account) this.accountRepository.findByKeycloakId(req.getId())
            .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.USER_NOT_FOUND));

    Map<String, List<String>> attributes = new HashMap<>();
    attributes.put("avatar", Collections.singletonList(req.getAvatar()));
    updateKeycloakUserAttributes(req.getId(), attributes);

    account.setAvatar(req.getAvatar());
    this.accountRepository.save(account);
    log.info("Updated avatar for account: {}", account.getId());
  }

  public void changePassword(ReqUpdatePassDTO dto) throws KeycloakException, NotFoundException {
    checkOldPassword(dto.getEmail(), dto.getOldPassword());
    try {
      UserResource userResource = getUserResource(dto.getUserId());
      CredentialRepresentation credential = createPasswordCredentials(dto.getNewPassword());
      userResource.resetPassword(credential);
    } catch (Exception e) {
      throw new KeycloakException("Error when changing password: " + e.getMessage());
    }
  }
  public void sendEmailVerification(String email, String purpose, String redirectUri) {
      Account account = (Account) this.accountRepository.findByEmail(email)
              .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.USER_NOT_FOUND));

    try {
      String userId = account.getKeycloakId();
      UserResource userResource = getUserResource(userId);
//      userResource.executeActionsEmail(clientId, "http://localhost:5173/",Collections.singletonList(purpose));
//      CredentialRepresentation credential = createPasswordCredentials("justfortest");
//      userResource.resetPassword(credential);
//      userResource.sendVerifyEmail();

//      Keycloak keycloak = Keycloak.getInstance(
//              "http://localhost:8180",
//              "Lingo",
//              email,
//              "justfortest",
//              "Lingo",
//              clientSecret
//      );
//
//      try {
//        keycloak.tokenManager().getAccessToken();
//        CredentialRepresentation credential = createPasswordCredentials("justfortest2");
//        userResource.resetPassword(credential);
//      } catch (Exception e) {
//        log.error(e.getMessage());
//      }


    } catch (Exception e) {
      throw new RuntimeException("Keycloak: ", e);
    }
  }

  private String extractUserId(ResponseEntity<?> response) {
    List<String> locations = response.getHeaders().get("Location");
    if (locations == null || locations.isEmpty()) {
      throw new IllegalStateException("Location header is missing in the response");
    }

    String location = locations.get(0);
    String[] splitedStr = location.split("/");
    return splitedStr[splitedStr.length - 1];
  }

  private String getClientToken() {
    TokenExchangeRequest newToken = new TokenExchangeRequest("client_credentials", clientId, clientSecret, "openid");

    var token = this.identityClient.exchangeClientToken(newToken);
    return token.getAccessToken();
  }
  private void updateKeycloakUser(String userId, ReqUpdateAccountDTO request) {
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

  private void updateKeycloakUserAttributes(String userId, Map<String, List<String>> attributes) {
    UserRepresentation userRepresentation = getUserRepresentation(userId);
    userRepresentation.setAttributes(attributes);
    getUserResource(userId).update(userRepresentation);
  }

  public static CredentialRepresentation createPasswordCredentials(String password) {
    CredentialRepresentation passwordCredentials = new CredentialRepresentation();
    passwordCredentials.setTemporary(false);
    passwordCredentials.setType(CredentialRepresentation.PASSWORD);
    passwordCredentials.setValue(password);
    return passwordCredentials;
  }

  private UserRepresentation getUserRepresentation(String userId) {
    UserRepresentation userRepresentation =
            keycloak.realm(keycloakPropsConfig.getRealm()).users().get(userId).toRepresentation();

    if (userRepresentation == null) {
      throw new KeycloakException(Constants.ErrorCode.KEYCLOAK_USER_NOT_FOUND);
    }

    return userRepresentation;
  }

  private UserResource getUserResource(String userId) {
    RealmResource realmResource = keycloak.realm(keycloakPropsConfig.getRealm());
    return realmResource.users().get(userId);
  }

  private void checkOldPassword(String email, String oldPassword) throws KeycloakException, NotFoundException {
    String tokenUrl = String.format("%s/realms/%s/protocol/openid-connect/token", serverUrl, realm);

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

    MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
    map.add("grant_type", "password");
    map.add("client_id", clientId);
    map.add("client_secret", clientSecret);
    map.add("username", email);
    map.add("password", oldPassword);

    HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(map, headers);

    try {
      restTemplate.postForEntity(tokenUrl, request, String.class);
      log.info("Old password verified for user: {}", email);

    } catch (Exception e) {
      log.error("Error during password verification for user {}: {}", email, e.getMessage(), e);
      throw new KeycloakException("Internal error during password check.");
    }
  }

}
