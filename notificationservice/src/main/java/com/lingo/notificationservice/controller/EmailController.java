package com.lingo.notificationservice.controller;

import com.lingo.notificationservice.dto.request.RequestMailDTO;
import com.lingo.notificationservice.service.EmailService;
import com.lingo.notificationservice.utils.Constants;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api/v1/notification")
@RequiredArgsConstructor
@Tag(name = "Email Notification", description = "APIs for sending email notifications")
public class EmailController {

  private final EmailService emailService;

  @PostMapping
  @Operation(summary = "Send OTP email", description = "Sends an OTP (One-Time Password) email to the specified recipient")
  @ApiResponses({
          @ApiResponse(responseCode = "200", description = "Email sent successfully", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "400", description = "Invalid email request data", content = @Content(mediaType = "application/json")),
          @ApiResponse(responseCode = "500", description = "Email sending failed", content = @Content(mediaType = "application/json"))
  })
  public ResponseEntity<String> sendMailCode(
          @Parameter(description = "Email request containing recipient details and OTP", required = true)
          @RequestBody RequestMailDTO request) throws MessagingException {
    log.info("Sending mail to {}", request.getTo());
    this.emailService.sendOTPCode(request);
    return ResponseEntity.ok("Mail sent successfully");
  }
}