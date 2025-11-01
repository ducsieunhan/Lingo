package com.lingo.attempt.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResAttemptShortDTO {
  private Long attemptId;
  private Long quizId;
  private Date submittedAt;
  private Long score;
  private Long timeTaken;
  private String type;
  private List<ResAttemptShortDTO.SectionResult> sectionResults;

  @Data
  @AllArgsConstructor
  @NoArgsConstructor
  public static class SectionResult {
    private String type;
    private Integer correctAnswers;
    private Integer totalQuestions;
    private Double sectionScore;
    private Double maxPossibleScore;
  }
}
