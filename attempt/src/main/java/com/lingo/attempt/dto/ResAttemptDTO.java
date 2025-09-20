package com.lingo.attempt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResAttemptDTO {
  private Long quizId;
  private Long score;
  private Long timeTaken;
  private Date submittedAt;
  private List<Answers> answers;

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class Answers {
    private Long questionId;
    private String userAnswer;
    private String correctAnswer;
    private Boolean correct;
  }
}
