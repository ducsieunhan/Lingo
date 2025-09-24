package com.lingo.attempt.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "attempt_section_results")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class AttemptSectionResult {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @ManyToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "attempt_id")
  private Attempt attempt;

  @Column(name = "type")
  private String type;

  @Column(name = "correct_answers")
  private Integer correctAnswers;

  @Column(name = "total_questions")
  private Integer totalQuestions;

  @Column(name = "section_score")
  private Double sectionScore;

  @Column(name = "max_possible_score")
  private Double maxPossibleScore;
}