package com.lingo.account.controller;

import com.lingo.account.dto.request.ReqAccountDTO;
import com.lingo.account.dto.request.ReqAccountGGDTO;
import com.lingo.account.dto.request.ReqAvatarDTO;
import com.lingo.account.dto.request.ReqUpdateAccountDTO;
import com.lingo.account.dto.response.ResAccountDTO;
import com.lingo.account.dto.response.ResPaginationDTO;
import com.lingo.account.service.AccountService;
import com.lingo.common_library.exception.CreateUserException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/account")
public class AccountController {
  private AccountService accountService;

  public AccountController(AccountService accountService) {
    this.accountService = accountService;
  }

  @PostMapping
  public ResponseEntity<ResAccountDTO> createNewAccount(@RequestBody ReqAccountDTO request) throws CreateUserException {
    return ResponseEntity.ok(this.accountService.createNewAccount(request));
  }

  @GetMapping
  public ResponseEntity<ResPaginationDTO> getAllAccounts(
          @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
          @RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
          @RequestParam(value = "search", defaultValue = "", required = false) String search,
//          @RequestParam(value = "email", defaultValue = "", required = false) String email,
          @RequestParam(value = "roles", defaultValue = "", required = false) List<String> role,
          @RequestParam(value = "from", defaultValue = "", required = false) Long from,
          @RequestParam(value = "to", defaultValue = "", required = false) Long to
  ) {
    return ResponseEntity.ok(this.accountService.getAllAccounts(
            pageNo, pageSize, search, search, role, from, to
    ));
  }

  @GetMapping("/{id}")
  @Operation(summary = "Find account by id", description = "Return 200 if getting all account successfully")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Account found", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Wrong/not valid account", content = @Content(mediaType = "application/json")),
  })
  public ResponseEntity<ResAccountDTO> getAccount(@PathVariable String id){
    return ResponseEntity.ok(this.accountService.getAccount(id));
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Delete account by id", description = "Return 200 if the account deleted successfully")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Account deleted", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Wrong/not valid accounts", content = @Content(mediaType = "application/json")),
  })
  public ResponseEntity<String> deleteAccount(@PathVariable String id) {
    this.accountService.deleteAccount(id);
    return ResponseEntity.ok("Account deleted successfully");
  }

  @PostMapping("/enable")
  @Operation(summary = "Delete account by id", description = "Return 200 if the account deleted successfully")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Account deleted", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Wrong/not valid accounts", content = @Content(mediaType = "application/json")),
  })
  public ResponseEntity<String> enableAccount(@RequestParam String id, @RequestParam boolean enable) {
    this.accountService.updateEnableAccount(id, enable);
    return ResponseEntity.ok("Account deleted successfully");
  }

  @PutMapping()
  @Operation(summary = "Update account ", description = "Return 200 if the account updated successfully")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Account updated", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Wrong/not valid accounts", content = @Content(mediaType = "application/json")),
  })
  public ResponseEntity<ResAccountDTO> updateAccount(@RequestBody ReqUpdateAccountDTO req ) {
    return ResponseEntity.ok(this.accountService.updateAccount(req));
  }

  @PostMapping("/gg")
  public ResponseEntity<String> createAccountGG(@RequestBody ReqAccountGGDTO req ) {
    ResAccountDTO dto = this.accountService.createAccountGG(req);

    return ResponseEntity.ok("Account has been created!");
  }

  @PostMapping("/avatar")
  public ResponseEntity<String> updateAvatar(@RequestBody ReqAvatarDTO req) {

    this.accountService.updateAvatar(req);

    return ResponseEntity.ok("Avatar has been updated!");
  }
}
