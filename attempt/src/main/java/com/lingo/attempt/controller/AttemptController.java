package com.lingo.attempt.controller;

import com.lingo.attempt.dto.ReqAttemptDTO;
import com.lingo.attempt.dto.ResAttemptDTO;
import com.lingo.attempt.service.AttemptService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/attempt")
@RequiredArgsConstructor
public class AttemptController {
  private final AttemptService attemptService;

  @PostMapping
  public ResAttemptDTO createAttempt(@RequestBody ReqAttemptDTO req){
    return this.attemptService.createAttempt(req);
  }

  @GetMapping
  public List<ResAttemptDTO> getUserAttempts(@RequestParam Long userId){
    return this.attemptService.getUserAttempts(userId);
  }

  @GetMapping("/{attemptId}")
  public ResAttemptDTO getSingleAttempt(@PathVariable Long attemptId){
    return this.attemptService.getSingleAttempt(attemptId);
  }

}
