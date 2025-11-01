package com.lingo.attempt.repository;

import com.lingo.attempt.dto.ResAttemptShortDTO;
import com.lingo.attempt.model.AttemptSectionResult;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AttemptSectionResultRepository extends JpaRepository<AttemptSectionResult, Long> {
  List<AttemptSectionResult> findByAttempt_AttemptId(Long attemptAttemptId);
}
