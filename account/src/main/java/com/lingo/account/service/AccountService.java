package com.lingo.account.service;

import com.lingo.account.dto.request.ReqAccountDTO;
import com.lingo.account.dto.request.ReqAccountGGDTO;
import com.lingo.account.dto.request.ReqAvatarDTO;
import com.lingo.account.dto.request.ReqUpdateAccountDTO;
import com.lingo.account.dto.response.ResAccountDTO;
import com.lingo.account.dto.response.ResPaginationDTO;
import com.lingo.account.mapper.AccountMapper;
import com.lingo.account.model.Account;
import com.lingo.account.model.Role;
import com.lingo.account.repository.AccountRepository;
import com.lingo.account.repository.AccountSpecifications;
import com.lingo.account.repository.RoleRepository;
import com.lingo.account.utils.Constants;
import com.lingo.common_library.exception.CreateUserException;
import com.lingo.common_library.exception.KeycloakException;
import com.lingo.common_library.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class AccountService {
  private final AccountRepository accountRepository;
  private final AccountMapper accountMapper;
  private final RoleService roleService;
  private final RoleRepository roleRepository;
  private final KeycloakService keycloakService;
  private final String USER = "USER";

  public ResAccountDTO createNewAccount(ReqAccountDTO request) throws CreateUserException{

    if (this.accountRepository.findByUsername(request.getUsername()).isPresent()){
      throw new CreateUserException(Constants.ErrorCode.USER_NAME_ALREADY_EXITED);
    }

    if (this.accountRepository.findByEmail(request.getEmail()).isPresent()){
      throw new CreateUserException(Constants.ErrorCode.EMAIL_ALREADY_EXITED);
    }

    try {
      List<String> roleNames = request.getRoles().length > 0 && request.getRoles()[0] != null
              ? Arrays.asList(request.getRoles())
              : List.of(USER);

      String userId = this.keycloakService.createNewUser(request, roleNames );
      Account account = accountMapper.toModel(request, userId);

      List<Role> roles = this.roleRepository.findAllByNameIn(roleNames);
      log.info("KEYCLOAK, User created with id: {}", userId);
      account.setRoles(roles);
      this.accountRepository.save(account);
      return accountMapper.toResDTO(account);
    } catch (Exception e) {
      throw new CreateUserException("Error while creating new user: ", e.getMessage());
    }
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
      this.keycloakService.deleteKeycloakUser(id);
      this.accountRepository.delete(account);
    } catch (Exception e) {
      throw new NotFoundException(Constants.ErrorCode.ERROR_DELETING_ACCOUNT);
    }
  }

  public ResAccountDTO updateAccount(ReqUpdateAccountDTO request) {
    Account account = (Account) this.accountRepository.findByKeycloakId(request.getId())
            .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.USER_NOT_FOUND));

    // Update Keycloak user representation
    this.keycloakService.updateKeycloakUser(request.getId(), request);

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
    Account account = (Account) this.accountRepository.findByKeycloakId(id)
            .orElseThrow(() -> new NotFoundException(Constants.ErrorCode.USER_NOT_FOUND));

    if (account != null) {
      this.keycloakService.updateEnableKeycloakUser(id, enable);
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
    this.keycloakService.updateKeycloakUserAttributes(req.getId(), attributes);

    account.setAvatar(req.getAvatar());
    this.accountRepository.save(account);
    log.info("Updated avatar for account: {}", account.getId());
  }
}
