package com.lingo.attempt.repository;

import com.lingo.attempt.model.UserAnswers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAnswersRepository extends JpaRepository<UserAnswers, Long> {

}
