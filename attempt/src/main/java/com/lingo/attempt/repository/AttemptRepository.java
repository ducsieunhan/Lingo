package com.lingo.attempt.repository;

import com.lingo.attempt.dto.ResAttemptShortDTO;
import com.lingo.attempt.model.Attempt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface AttemptRepository extends JpaRepository<Attempt, Long> {
  List<Attempt> findByUserId(String userId);

  @Query("SELECT new com.lingo.attempt.dto.ResAttemptShortDTO(a.attemptId, a.quizId, a.submittedAt, a.score, a.timeTaken, a.type,null) " +
          "FROM Attempt a WHERE a.userId = :userId")
  List<ResAttemptShortDTO> getUserAttemptsShort(String userId);
}
