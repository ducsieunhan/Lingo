package com.lingo.attempt.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "attempts")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Attempt {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "attempt_id")
  private Long attemptId;
  private String userId;
  private Long quizId;
  private String testTitle;
  private Long score;
  private Long timeTaken;
  private Date submittedAt;
  private String type ;

  private String gradingIeltsId;   // delete after


  @OneToMany(mappedBy = "attempt",cascade = CascadeType.ALL, orphanRemoval = true)
  private List<UserAnswers> userAnswers;

  @OneToMany(mappedBy = "attempt", cascade = CascadeType.ALL, orphanRemoval = true)
  private List<AttemptSectionResult> sectionResults;

  @PrePersist
  protected void prePersist() {
    if (this.submittedAt == null) submittedAt = new Date();
  }
}
