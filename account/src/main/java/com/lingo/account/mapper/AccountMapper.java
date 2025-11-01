package com.lingo.account.mapper;

import com.lingo.account.dto.request.ReqAccountDTO;
import com.lingo.account.dto.response.ResAccountDTO;
import com.lingo.account.model.Account;
import com.lingo.account.model.Role;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AccountMapper {

  private final ModelMapper modelMapper;

  public Account toModel(ReqAccountDTO reqAccountDTO, String keycloakId) {
    if (reqAccountDTO == null) {
      return null;
    }

    Account account = modelMapper.map(reqAccountDTO, Account.class);

    account.setKeycloakId(keycloakId);

    account.setEnable(true);

    return account;
  }

  public ResAccountDTO toResDTO(Account account) {
    if (account == null) {
      return null;
    }

    ResAccountDTO dto = modelMapper.map(account, ResAccountDTO.class);
    dto.setRoles(account.getRoles().stream().map(Role::getName).toArray(String[]::new));

    return dto;
  }
}
