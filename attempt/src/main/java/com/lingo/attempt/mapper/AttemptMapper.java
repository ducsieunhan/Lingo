package com.lingo.attempt.mapper;

import com.lingo.attempt.dto.ResAttemptDTO;
import com.lingo.attempt.dto.ResAttemptShortDTO;
import com.lingo.attempt.model.Attempt;
import com.lingo.attempt.model.AttemptSectionResult;
import com.lingo.attempt.model.UserAnswers;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;

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

  public ResAttemptDTO.SectionResult toResSectionResultDTO(AttemptSectionResult result){
    if (result == null) return null;
    return modelMapper.map(result, ResAttemptDTO.SectionResult.class);
  }

  public List<ResAttemptShortDTO.SectionResult> toResShortSectionResultDTO(List<AttemptSectionResult> section){
    if (section == null) return null;

    return section.stream().map(sec ->
            modelMapper.map(sec, ResAttemptShortDTO.SectionResult.class)).toList();
  }

  public ResAttemptShortDTO toResAttemptShortDTO(Attempt attempt){
    if (attempt == null) return null;
    return modelMapper.map(attempt, ResAttemptShortDTO.class);
  }
}
