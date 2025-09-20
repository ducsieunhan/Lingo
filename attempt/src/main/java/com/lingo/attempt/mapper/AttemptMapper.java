package com.lingo.attempt.mapper;

import com.lingo.attempt.dto.ResAttemptDTO;
import com.lingo.attempt.model.Attempt;
import com.lingo.attempt.model.UserAnswers;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AttemptMapper {
  private final ModelMapper modelMapper;

  public ResAttemptDTO toResAttemptDTO(Attempt attempt){
    if (attempt == null) return null;

    return modelMapper.map(attempt, ResAttemptDTO.class);
  }

  public ResAttemptDTO.Answers toResAnswerDTO(UserAnswers userAnswers){
    if (userAnswers == null) return null;
    return modelMapper.map(userAnswers, ResAttemptDTO.Answers.class);
  }
}
