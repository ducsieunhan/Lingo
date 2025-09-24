package com.lingo.attempt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReqAttemptDTO {
  private Long quizId;
  private Long timeTaken;
  private String type; // toeic ielts
  private String[] field;
  private List<AnswerDTO> answers;

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class AnswerDTO {
    private Long questionId;
    private String userAnswer;
  }
}
