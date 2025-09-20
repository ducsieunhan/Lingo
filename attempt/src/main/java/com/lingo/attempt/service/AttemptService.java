package com.lingo.attempt.service;

import com.lingo.attempt.dto.ReqAttemptDTO;
import com.lingo.attempt.dto.ResAttemptDTO;
import com.lingo.attempt.dto.ResCorrectAns;
import com.lingo.attempt.mapper.AttemptMapper;
import com.lingo.attempt.model.Attempt;
import com.lingo.attempt.model.UserAnswers;
import com.lingo.attempt.repository.AttemptRepository;
import com.lingo.attempt.repository.UserAnswersRepository;
import com.lingo.attempt.utils.Constants;
import com.lingo.common_library.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AttemptService {
  private final AttemptRepository attemptRepository;
  private final UserAnswersRepository userAnswersRepository;
//  private final FeignTestService feignTestService;
  private final AttemptMapper attemptMapper;
  private final TestServiceFallback feignTestService;

  public ResAttemptDTO createAttempt(ReqAttemptDTO req) {
    // get all question id
    List<Long> questionList = req.getAnswers().stream()
            .filter(q -> q.getUserAnswer() != null )
            .map(ReqAttemptDTO.AnswerDTO::getQuestionId)
            .toList();

    if (questionList.isEmpty()) {
      throw new IllegalArgumentException("No valid answers provided");
    }

    Map<Long, String> answers = this.feignTestService.getCorrectAnswer(questionList).stream()
            .collect(Collectors.toMap(ResCorrectAns::getQuestionId, ResCorrectAns::getCorrectAnswer));

    Attempt attempt = new Attempt();
    attempt.setQuizId(req.getQuizId());
    attempt.setTimeTaken(req.getTimeTaken());

    // user id get with JWT
    attempt.setUserId((long) 1);

    int correctListening = 0 ;
    int correctReading = 0 ;
    int questionCount = 1;

    List<UserAnswers> list = new ArrayList<>(); //db

    for (ReqAttemptDTO.AnswerDTO ans : req.getAnswers()) {
      if (ans.getUserAnswer() == null || ans.getUserAnswer().trim().isEmpty()) {
        continue;
      }

      String correctAnswer = answers.get(ans.getQuestionId());

      UserAnswers userAnswers = new UserAnswers();
      userAnswers.setCorrectAnswer(answers.get(ans.getQuestionId()));
      userAnswers.setUserAnswer(ans.getUserAnswer());
      userAnswers.setQuestionId(ans.getQuestionId());
      userAnswers.setAttempt(attempt);

      boolean isCorrect = Objects.equals(correctAnswer.trim(), ans.getUserAnswer().trim());
      userAnswers.setCorrect(isCorrect);

      if(isCorrect) {
        if(questionCount <= 10) correctListening++;
        else correctReading++;
      }
      questionCount++;

      list.add(userAnswers);
    }

    // count point
    double score = PointCounting.calculatePoint(req.getType(), correctListening, correctReading);


    attempt.setUserAnswers(list);
    attempt.setScore((long) score);

    attempt = this.attemptRepository.save(attempt);

    List<UserAnswers> savedAnswers = this.userAnswersRepository.saveAll(list);
    ResAttemptDTO resAttemptDTO = this.attemptMapper.toResAttemptDTO(attempt);
    List<ResAttemptDTO.Answers> answersDTO = savedAnswers.stream()
            .map(this.attemptMapper::toResAnswerDTO)
            .toList();
    resAttemptDTO.setAnswers(answersDTO);

    return resAttemptDTO;
  }

  public ResAttemptDTO getSingleAttempt(Long attemptId) {
    Attempt attempt = this.attemptRepository.findById(attemptId)
            .orElseThrow(() -> new NotFoundException(Constants.ATTEMPT_NOT_FOUND));

    ResAttemptDTO att = this.attemptMapper.toResAttemptDTO(attempt);
    List<ResAttemptDTO.Answers> answers = attempt.getUserAnswers().stream()
            .map(this.attemptMapper::toResAnswerDTO)
            .toList();
    att.setAnswers(answers);

    return att;


  }

  public List<ResAttemptDTO> getUserAttempts(Long userId){

    List<ResAttemptDTO> list = new ArrayList<>();
    List<Attempt> attempts = null;
    try {
      attempts = this.attemptRepository.findByUserId(userId);

      for(Attempt attempt : attempts) {
        ResAttemptDTO att = this.attemptMapper.toResAttemptDTO(attempt);
        List<ResAttemptDTO.Answers> answers = attempt.getUserAnswers().stream()
                .map(this.attemptMapper::toResAnswerDTO)
                .toList();
        att.setAnswers(answers);
        list.add(att);
      }
      return list;

    } catch (NotFoundException e) {
      throw new NotFoundException(Constants.USER_NOT_FOUND);
    }
  }
}
