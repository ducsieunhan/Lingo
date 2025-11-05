package com.lingo.attempt.controller;

import com.lingo.attempt.dto.ReqAttemptDTO;
import com.lingo.attempt.dto.ResAttemptDTO;
import com.lingo.attempt.dto.ResAttemptShortDTO;
import com.lingo.attempt.service.AttemptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/attempt")
@RequiredArgsConstructor
public class AttemptController {
  private final AttemptService attemptService;

//  @PostMapping
//  public ResAttemptDTO createAttempt(@RequestBody ReqAttemptDTO req){
//    return this.attemptService.createAttempt(req);
//  }

  @PostMapping
  public ResponseEntity<Long> createAttempt(@RequestBody ReqAttemptDTO req){
    return ResponseEntity.ok(this.attemptService.createAttempt(req));
  }

  @GetMapping("/full")
  public List<ResAttemptDTO> getUserAttempts(@RequestParam String userId){
    return this.attemptService.getUserAttempts(userId);
  }

  @GetMapping
  public List<ResAttemptShortDTO> getUserAttemptsShort(@RequestParam String userId){
    return this.attemptService.getUserAttemptsShort(userId);
  }


  @GetMapping("/{attemptId}")
  public ResponseEntity<ResAttemptDTO> getSingleAttempt(@PathVariable Long attemptId){
    return ResponseEntity.ok(this.attemptService.getSingleAttempt(attemptId));
  }

  @GetMapping("/all")
  public ResponseEntity<List<ResAttemptDTO>> getAll(){
    return ResponseEntity.ok(this.attemptService.getAllAttempts());
  }
}
