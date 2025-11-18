package com.lingo.account.controller;

import com.lingo.account.dto.request.*;
import com.lingo.account.dto.response.ResAccountDTO;
import com.lingo.account.dto.response.ResPaginationDTO;
import com.lingo.account.repository.MessageService;
import com.lingo.account.service.AccountService;
import com.lingo.account.service.KeycloakService;
import com.lingo.account.service.OtpService;
import com.lingo.common_library.exception.CreateUserException;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/v1/account")
@RequiredArgsConstructor
@Tag(name = "Account Management", description = "APIs for managing user accounts")
public class AccountController {
  private final AccountService accountService;
  private final OtpService otpService;
  private final KeycloakService keycloakService;

  @PostMapping
  @Operation(summary = "Create new account", description = "Creates a new user account with the provided information")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Account created successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Invalid account data provided", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "409", description = "Account already exists", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<ResAccountDTO> createNewAccount(
          @Parameter(description = "Account creation request data", required = true)
          @RequestBody ReqAccountDTO request) throws CreateUserException {
    return ResponseEntity.ok(this.accountService.createNewAccount(request));
  }

  @GetMapping
  @Operation(summary = "Get all accounts with pagination", description = "Retrieves a paginated list of all accounts with optional filtering")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Accounts retrieved successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Invalid pagination parameters", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "500", description = "Internal server error", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<ResPaginationDTO> getAllAccounts(
          @Parameter(description = "Page number (0-based)", example = "0")
          @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
          @Parameter(description = "Page size", example = "5")
          @RequestParam(value = "pageSize", defaultValue = "5", required = false) int pageSize,
          @Parameter(description = "Search term for filtering accounts", example = "john@example.com")
          @RequestParam(value = "search", defaultValue = "", required = false) String search,
          @Parameter(description = "Filter by roles", example = "[\"USER\", \"ADMIN\"]")
          @RequestParam(value = "roles", defaultValue = "", required = false) List<String> role,
          @Parameter(description = "Filter accounts created from timestamp", example = "1640995200000")
          @RequestParam(value = "from", defaultValue = "", required = false) Long from,
          @Parameter(description = "Filter accounts created to timestamp", example = "1672531200000")
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
  public ResponseEntity<ResAccountDTO> getAccount(
          @Parameter(description = "Account ID", required = true, example = "d294b705-03b9-4bd5-a7ab-7b8b691c713d")
          @PathVariable String id){
    return ResponseEntity.ok(this.accountService.getAccount(id));
  }

  @GetMapping("/getByUsername/{username}")
  @Operation(summary = "Find account by username", description = "Return 200 if getting all account successfully")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Account found", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Wrong/not valid account", content = @Content(mediaType = "application/json")),
  })
  public ResponseEntity<ResAccountDTO> getAccountByUsername(
          @Parameter(description = "Username to search for", required = true, example = "john_doe")
          @PathVariable String username){
    return ResponseEntity.ok(this.accountService.getAccountByUsername(username));
  }

  @DeleteMapping("/{id}")
  @Operation(summary = "Delete account by id", description = "Return 200 if the account deleted successfully")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Account deleted", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Wrong/not valid accounts", content = @Content(mediaType = "application/json")),
  })
  public ResponseEntity<String> deleteAccount(
          @Parameter(description = "Account ID to delete", required = true, example = "d294b705-03b9-4bd5-a7ab-7b8b691c713d")
          @PathVariable String id) {
    this.accountService.deleteAccount(id);
    return ResponseEntity.ok("Account deleted successfully");
  }

  @PostMapping("/enable")
  @Operation(summary = "Enable or disable account", description = "Updates the enabled status of an account")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Account status updated successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Wrong/not valid accounts", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "Account not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<String> enableAccount(
          @Parameter(description = "Account ID to update", required = true, example = "d294b705-03b9-4bd5-a7ab-7b8b691c713d")
          @RequestParam String id,
          @Parameter(description = "Enable or disable the account", required = true, example = "true")
          @RequestParam boolean enable) {
    this.accountService.updateEnableAccount(id, enable);
    return ResponseEntity.ok("Update account successfully");
  }

  @PutMapping()
  @Operation(summary = "Update account", description = "Return 200 if the account updated successfully")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Account updated", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Wrong/not valid accounts", content = @Content(mediaType = "application/json")),
  })
  public ResponseEntity<ResAccountDTO> updateAccount(
          @Parameter(description = "Account update request data", required = true)
          @RequestBody ReqUpdateAccountDTO req ) {
    return ResponseEntity.ok(this.accountService.updateAccount(req));
  }

  @PostMapping("/gg")
  @Operation(summary = "Create account with Google", description = "Creates a new account using Google authentication data")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Google account created successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Invalid Google account data", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "409", description = "Account already exists", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<String> createAccountGG(
          @Parameter(description = "Google account creation request data", required = true)
          @RequestBody ReqAccountGGDTO req ) {
    ResAccountDTO dto = this.accountService.createAccountGG(req);

    return ResponseEntity.ok("Account has been created!");
  }

  @PostMapping("/avatar")
  @Operation(summary = "Update user avatar", description = "Updates the avatar image for a user account")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Avatar updated successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Invalid avatar data", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "Account not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<String> updateAvatar(
          @Parameter(description = "Avatar update request data", required = true)
          @RequestBody ReqAvatarDTO req) {

    this.accountService.updateAvatar(req);

    return ResponseEntity.ok("Avatar has been updated!");
  }

  @PostMapping("/send-otp")
  @Operation(summary = "Send OTP to email", description = "Sends a one-time password to the specified email address")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "OTP sent successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Invalid email address", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "Email not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<String> sendOTP(
          @Parameter(description = "Email address to send OTP to", required = true, example = "user@example.com")
          @RequestParam String email,
          @Parameter(description = "Whether this OTP is for password reset", example = "false")
          @RequestParam(defaultValue = "false") boolean resetPass){
    String otp = this.otpService.generateOtp();
    this.accountService.sendOTP(email, otp, resetPass);
    return ResponseEntity.ok("OTP has been sent!");
  }

  @PostMapping("/verify-otp")
  @Operation(summary = "Verify OTP", description = "Verifies the one-time password for the given email")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "OTP verified successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Invalid or expired OTP", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "Email not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<String> verifyOTP(
          @Parameter(description = "Email address associated with the OTP", required = true, example = "user@example.com")
          @RequestParam String email,
          @Parameter(description = "The OTP code to verify", required = true, example = "123456")
          @RequestParam String otp){
    this.otpService.verifyOtp(email, otp);
    return ResponseEntity.ok("OTP has been verified!");
  }

  @PutMapping("/reset-password")
  @Operation(summary = "Reset password", description = "Resets the user password using verified credentials")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Password reset successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Invalid reset password request", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "404", description = "Account not found", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<String> resetPass(
          @Parameter(description = "Password reset request data", required = true)
          @RequestBody ReqResetPassDTO req){
    this.keycloakService.resetPassword(req.getEmail(), req.getPassword());
    return ResponseEntity.ok("Password has been reset!");
  }

}