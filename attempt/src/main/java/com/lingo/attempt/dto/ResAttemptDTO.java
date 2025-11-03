package com.lingo.attempt.dto;

import jakarta.persistence.Column;
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
  private String userId;
  private Long score;
  private Long timeTaken;
  private Date submittedAt;
  private String type;
  private List<SectionResult> sectionResults;
  private List<Answers> answers;

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
