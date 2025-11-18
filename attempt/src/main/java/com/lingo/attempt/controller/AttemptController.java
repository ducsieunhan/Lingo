package com.lingo.attempt.controller;

import com.lingo.attempt.dto.ReqAttemptDTO;
import com.lingo.attempt.dto.ReqAttemptPut;
import com.lingo.attempt.dto.ResAttemptDTO;
import com.lingo.attempt.dto.ResAttemptShortDTO;
import com.lingo.attempt.service.AttemptService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/attempt")
@RequiredArgsConstructor
@Tag(name = "Attempt Management", description = "API for managing user attempts on quizzes and tests")
public class AttemptController {
  private final AttemptService attemptService;

  @Operation(
          summary = "Create a new attempt",
          description = "Creates a new attempt for a user on a specific quiz or test. Supports both auto-graded (TOEIC/IELTS Listening/Reading) and manual-graded (Speaking/Writing) attempts."
  )
  @ApiResponses(value = {
          @ApiResponse(
                  responseCode = "200",
                  description = "Attempt created successfully",
                  content = @Content(schema = @Schema(implementation = Long.class))
          ),
          @ApiResponse(
                  responseCode = "400",
                  description = "Invalid request data or empty answers",
                  content = @Content
          ),
          @ApiResponse(
                  responseCode = "500",
                  description = "Internal server error during attempt creation",
                  content = @Content
          )
  })
  @PostMapping
  public ResponseEntity<Long> createAttempt(
          @Parameter(description = "Attempt request data containing user answers and test information", required = true)
          @RequestBody ReqAttemptDTO req
  ){
    return ResponseEntity.ok(this.attemptService.createAttempt(req));
  }

  @Operation(
          summary = "Update an existing attempt",
          description = "Updates specific fields of an existing attempt such as score, time taken, or type."
  )
  @ApiResponses(value = {
          @ApiResponse(
                  responseCode = "200",
                  description = "Attempt updated successfully",
                  content = @Content(schema = @Schema(implementation = ResAttemptDTO.class))
          ),
          @ApiResponse(
                  responseCode = "404",
                  description = "Attempt not found with the given ID",
                  content = @Content
          ),
          @ApiResponse(
                  responseCode = "400",
                  description = "Invalid request data or missing attempt ID",
                  content = @Content
          )
  })
  @PutMapping
  public ResponseEntity<ResAttemptDTO> updateAttempt(
          @Parameter(description = "Update request containing attempt ID and fields to update", required = true)
          @RequestBody ReqAttemptPut request
  ) {
    ResAttemptDTO updatedAttempt = attemptService.updateAttempt(request);
    return ResponseEntity.ok(updatedAttempt);
  }

  @Operation(
          summary = "Delete an attempt",
          description = "Permanently deletes an attempt and all associated data (user answers, section results) by attempt ID."
  )
  @ApiResponses(value = {
          @ApiResponse(
                  responseCode = "204",
                  description = "Attempt deleted successfully",
                  content = @Content
          ),
          @ApiResponse(
                  responseCode = "404",
                  description = "Attempt not found with the given ID",
                  content = @Content
          ),
          @ApiResponse(
                  responseCode = "400",
                  description = "Invalid attempt ID",
                  content = @Content
          )
  })
  @DeleteMapping("/{attemptId}")
  public ResponseEntity<Void> deleteAttempt(
          @Parameter(description = "ID of the attempt to delete", required = true, example = "123")
          @PathVariable Long attemptId
  ) {
    attemptService.deleteAttempt(attemptId);
    return ResponseEntity.noContent().build();
  }

  @Operation(
          summary = "Count user attempts",
          description = "Returns the total number of attempts made by a specific user across all quizzes and tests."
  )
  @ApiResponses(value = {
          @ApiResponse(
                  responseCode = "200",
                  description = "Count retrieved successfully",
                  content = @Content(schema = @Schema(implementation = Long.class))
          ),
          @ApiResponse(
                  responseCode = "400",
                  description = "Invalid or empty user ID",
                  content = @Content
          )
  })
  @GetMapping("/count")
  public ResponseEntity<Long> countUserAttempts(
          @Parameter(description = "ID of the user to count attempts for", required = true, example = "user123")
          @RequestParam String userId
  ) {
    long count = attemptService.countUserAttempts(userId);
    return ResponseEntity.ok(count);
  }

  @Operation(
          summary = "Get user's maximum score",
          description = "Returns the highest score achieved by a user across all their attempts. Returns 0 if the user has no attempts."
  )
  @ApiResponses(value = {
          @ApiResponse(
                  responseCode = "200",
                  description = "Maximum score retrieved successfully",
                  content = @Content(schema = @Schema(implementation = Long.class))
          ),
          @ApiResponse(
                  responseCode = "400",
                  description = "Invalid or empty user ID",
                  content = @Content
          )
  })
  @GetMapping("/max-score")
  public ResponseEntity<Long> getMaxScoreByUser(
          @Parameter(description = "ID of the user to get maximum score for", required = true, example = "user123")
          @RequestParam String userId
  ) {
    Long maxScore = attemptService.getMaxScoreByUser(userId);
    return ResponseEntity.ok(maxScore);
  }

  @Operation(
          summary = "Get user attempts (full details)",
          description = "Retrieves all attempts made by a user with complete details including answers, section results, and scores."
  )
  @ApiResponses(value = {
          @ApiResponse(
                  responseCode = "200",
                  description = "User attempts retrieved successfully",
                  content = @Content(schema = @Schema(implementation = ResAttemptDTO.class))
          ),
          @ApiResponse(
                  responseCode = "404",
                  description = "User not found or has no attempts",
                  content = @Content
          ),
          @ApiResponse(
                  responseCode = "400",
                  description = "Invalid user ID",
                  content = @Content
          )
  })
  @GetMapping("/full")
  public List<ResAttemptDTO> getUserAttempts(
          @Parameter(description = "ID of the user to get attempts for", required = true, example = "user123")
          @RequestParam String userId
  ){
    return this.attemptService.getUserAttempts(userId);
  }

  @Operation(
          summary = "Get user attempts (short summary)",
          description = "Retrieves a condensed summary of all attempts made by a user with basic information and section results only."
  )
  @ApiResponses(value = {
          @ApiResponse(
                  responseCode = "200",
                  description = "User attempts summary retrieved successfully",
                  content = @Content(schema = @Schema(implementation = ResAttemptShortDTO.class))
          ),
          @ApiResponse(
                  responseCode = "404",
                  description = "User not found or has no attempts",
                  content = @Content
          ),
          @ApiResponse(
                  responseCode = "400",
                  description = "Invalid user ID",
                  content = @Content
          )
  })
  @GetMapping
  public List<ResAttemptShortDTO> getUserAttemptsShort(
            @Parameter(description = "ID of the user to get attempts summary for", required = true, example = "user123")
          @RequestParam String userId
  ){
    return this.attemptService.getUserAttemptsShort(userId);
  }

  @Operation(
          summary = "Get single attempt details",
          description = "Retrieves complete details of a specific attempt including all answers, section results, and scoring information."
  )
  @ApiResponses(value = {
          @ApiResponse(
                  responseCode = "200",
                  description = "Attempt details retrieved successfully",
                  content = @Content(schema = @Schema(implementation = ResAttemptDTO.class))
          ),
          @ApiResponse(
                  responseCode = "404",
                  description = "Attempt not found with the given ID",
                  content = @Content
          ),
          @ApiResponse(
                  responseCode = "400",
                  description = "Invalid attempt ID",
                  content = @Content
          )
  })
  @GetMapping("/{attemptId}")
  public ResponseEntity<ResAttemptDTO> getSingleAttempt(
          @Parameter(description = "ID of the attempt to retrieve", required = true, example = "123")
          @PathVariable Long attemptId
  ){
    return ResponseEntity.ok(this.attemptService.getSingleAttempt(attemptId));
  }

  @Operation(
          summary = "Get all attempts (Admin only)",
          description = "Retrieves all attempts from all users in the system. This endpoint is typically used for administrative purposes."
  )
  @ApiResponses(value = {
          @ApiResponse(
                  responseCode = "200",
                  description = "All attempts retrieved successfully",
                  content = @Content(schema = @Schema(implementation = ResAttemptDTO.class))
          ),
          @ApiResponse(
                  responseCode = "500",
                  description = "Internal server error while retrieving attempts",
                  content = @Content
          )
  })
  @GetMapping("/all")
  public ResponseEntity<List<ResAttemptDTO>> getAll(){
    return ResponseEntity.ok(this.attemptService.getAllAttempts());
  }
}