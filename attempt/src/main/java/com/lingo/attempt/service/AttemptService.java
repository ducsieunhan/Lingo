package com.lingo.attempt.service;

import com.lingo.attempt.dto.ReqAttemptDTO;
import com.lingo.attempt.dto.ResAttemptDTO;
import com.lingo.attempt.dto.ResAttemptShortDTO;
import com.lingo.attempt.dto.ResCorrectAns;
import com.lingo.attempt.mapper.AttemptMapper;
import com.lingo.attempt.model.Attempt;
import com.lingo.attempt.model.AttemptSectionResult;
import com.lingo.attempt.model.UserAnswers;
import com.lingo.attempt.repository.AttemptRepository;
import com.lingo.attempt.repository.AttemptSectionResultRepository;
import com.lingo.attempt.repository.UserAnswersRepository;
import com.lingo.attempt.utils.Constants;
import com.lingo.common_library.exception.EmptyException;
import com.lingo.common_library.exception.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class AttemptService {
  private final AttemptRepository attemptRepository;
  private final UserAnswersRepository userAnswersRepository;
  private final AttemptSectionResultRepository attemptSectionResultRepository;
  private final FeignTestService feignTestService;
  private final AttemptMapper attemptMapper;
  private static final Logger logger = LoggerFactory.getLogger(AttemptService.class);

  public List<ResAttemptDTO> getAllAttempts (){
    return this.attemptRepository.findAll()
            .stream().map(this.attemptMapper :: toResAttemptDTO)
            .toList();
  }
  
  public Long createAttempt(ReqAttemptDTO req) {
    validateRequest(req);
    Attempt attempt = buildAttempt(req);

    List<String> field = Arrays.asList(req.getField());
    if(field.contains("Listening") || field.contains("Reading") ) {
      attempt = gradingLR(attempt, req);
    } else {
      attempt = gradingSW(attempt, req);
    }

    attempt = this.attemptRepository.save(attempt);
    return attempt.getAttemptId();
  }

  public ResAttemptDTO getSingleAttempt(Long attemptId) {
    Attempt attempt = this.attemptRepository.findById(attemptId)
            .orElseThrow(() -> new NotFoundException(Constants.ATTEMPT_NOT_FOUND));

    ResAttemptDTO att = buildResponse(attempt, attempt.getUserAnswers(), attempt.getSectionResults());

    return att;
  }

  public List<ResAttemptDTO> getUserAttempts(String userId){

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

  public List<ResAttemptShortDTO> getUserAttemptsShort(String userId){
    try {
      List<ResAttemptShortDTO> attempts = this.attemptRepository.getUserAttemptsShort(userId);

      for (ResAttemptShortDTO attempt : attempts){
        List<AttemptSectionResult> section = this.attemptSectionResultRepository.findByAttempt_AttemptId(attempt.getAttemptId());

        List<ResAttemptShortDTO.SectionResult> ResSection = this.attemptMapper.toResShortSectionResultDTO(section);

        attempt.setSectionResults(ResSection);
      }
      return attempts;
    } catch (NotFoundException e) {
      throw new NotFoundException(Constants.USER_NOT_FOUND);
    }
  }

  private void validateRequest(ReqAttemptDTO req) {
    if (req == null || req.getAnswers() == null || req.getAnswers().isEmpty()) {
      throw new EmptyException(Constants.EMPTY_REQUEST);
    }
    if (req.getField() == null || req.getField().length == 0) {
      throw new IllegalArgumentException(Constants.EMPTY_REQUEST);
    }
  }

  private List<Long> extractQuestionIds(ReqAttemptDTO req) {
    List<Long> questionIds = req.getAnswers().stream()
            .filter(q -> q.getUserAnswer() != null )
            .map(ReqAttemptDTO.AnswerDTO::getQuestionId)
            .toList();

    if (questionIds.isEmpty()) {
      throw new IllegalArgumentException("No valid answers provided");
    }

    return questionIds;
  }

  private Map<Long, String> getCorrectAnswers(long testId) {
    try {
      return feignTestService.getCorrectAnswer(testId).stream()
              .collect(Collectors.toMap(
                      ResCorrectAns::getQuestionId,
                      ResCorrectAns::getCorrectAnswer
              ));
    } catch (Exception e) {
//      log.error("Failed to fetch correct answers for questions: {}", questionIds, e);
      throw new RuntimeException("Unable to retrieve correct answers", e);
    }
  }

  private Attempt buildAttempt(ReqAttemptDTO req) {
    Attempt attempt = new Attempt();
    attempt.setQuizId(req.getQuizId());
    attempt.setTimeTaken(req.getTimeTaken());
    attempt.setType(req.getType());
    // user id get with JWT
    attempt.setUserId(req.getUserId());
    return attempt;
  }

  private List<AttemptSectionResult> buildSectionResults(ReqAttemptDTO req, double[] scores, int[] sectionCounts, Attempt attempt) {
    List<AttemptSectionResult> sectionResults = new ArrayList<>();

    for (int i = 0; i < scores.length; i++) {
      AttemptSectionResult sectionResult = new AttemptSectionResult();
      sectionResult.setSectionScore(scores[i]);
      sectionResult.setType(req.getField()[i]);
      sectionResult.setCorrectAnswers(sectionCounts[i]);
      sectionResult.setTotalQuestions(req.getAnswers().size() / req.getField().length);
      sectionResult.setAttempt(attempt);

      if (req.getType().equals("TOEIC")) {
        sectionResult.setMaxPossibleScore(Constants.TOEIC_MAX_SECTION_SCORE);
      } else if (req.getType().equals("IELTS")) {
        sectionResult.setMaxPossibleScore(Constants.IELTS_MAX_SECTION_SCORE);
      }
      sectionResults.add(sectionResult);
    }

    return sectionResults;
  }

  private ResAttemptDTO buildResponse(Attempt attempt, List<UserAnswers> answers, List<AttemptSectionResult> sectionResults) {
    ResAttemptDTO response = attemptMapper.toResAttemptDTO(attempt);

    List<ResAttemptDTO.Answers> answersDTO = answers.stream()
            .map(attemptMapper::toResAnswerDTO)
            .toList();

    List<ResAttemptDTO.SectionResult> sectionResultsDTO = sectionResults.stream()
            .map(attemptMapper::toResSectionResultDTO)
            .toList();

    response.setAnswers(answersDTO);
    response.setSectionResults(sectionResultsDTO);

    return response;
  }

  private Attempt gradingLR(Attempt currentAttempt, ReqAttemptDTO req) {
    Map<Long, String> answers = getCorrectAnswers(req.getQuizId());

    int[] types = new int[req.getField().length];
    int questionCount = 1;

    List<UserAnswers> list = new ArrayList<>();

    for (ReqAttemptDTO.AnswerDTO ans : req.getAnswers()) {
      if (ans.getUserAnswer() == null) {
        continue;
      }

      String correctAnswer = answers.get(ans.getQuestionId());

      UserAnswers userAnswers = new UserAnswers();
      userAnswers.setCorrectAnswer(answers.get(ans.getQuestionId()));
      userAnswers.setUserAnswer(ans.getUserAnswer());
      userAnswers.setQuestionId(ans.getQuestionId());
      userAnswers.setAttempt(currentAttempt);

      boolean isCorrect = Objects.equals(correctAnswer.trim(), ans.getUserAnswer().trim());
      userAnswers.setCorrect(isCorrect);

      if (isCorrect) {
        if (req.getField().length >= 2) {
          if (questionCount <= (req.getAnswers().size() / 2)) {
            types[0]++;
          } else {
            types[1]++;
          }
        } else {
          // Chỉ có 1 kỹ năng
          types[0]++;
        }
      }
      questionCount++;

      list.add(userAnswers);
    }

    double[] scores = PointCounting.calculatePoint(req.getType(), types);

    List<AttemptSectionResult> sectionResults = buildSectionResults(req, scores, types, currentAttempt);

    currentAttempt.setSectionResults(sectionResults);
    currentAttempt.setUserAnswers(list);

    double totalScore = calculateTotalScore(req.getType(), scores);
    currentAttempt.setScore((long) (totalScore * 10));

    this.attemptSectionResultRepository.saveAll(sectionResults);
    this.userAnswersRepository.saveAll(list);

    return currentAttempt;
  }

  private double calculateTotalScore(String type, double[] scores) {
    if (type.equals("TOEIC")) {
      // TOEIC: Sum of both sections
      double total = 0;
      for (double score : scores) {
        total += score;
      }
      return total;
    } else if (type.equals("IELTS")) {
      // IELTS: Average of all sections (usually just 1 or 2)
      if (scores.length == 0) return 0;

      double sum = 0;
      for (double score : scores) {
        sum += score;
      }
      return sum / scores.length;
    }
    return 0;
  }

  private Attempt gradingSW(Attempt currentAttempt, ReqAttemptDTO req){

    UserAnswers userAnswers = new UserAnswers();
    userAnswers.setQuestionId(0L);  // id grading from model
    userAnswers.setUserAnswer(req.getAnswers().get(0).getUserAnswer());  // answers (might be url or paragraph)
    userAnswers.setAttempt(currentAttempt);
    userAnswers.setCorrectAnswer(null);
    userAnswers.setCorrect(true);

    int[] sections = {0};
    double[] scores = {0.0};
    List<AttemptSectionResult> sectionResults = buildSectionResults(req, scores,sections , currentAttempt);

    currentAttempt.setSectionResults(sectionResults);
    currentAttempt.setUserAnswers(Collections.singletonList(userAnswers));

    currentAttempt.setScore(0L);
    currentAttempt.setGradingIeltsId(req.getGradingIeltsId());
    this.attemptSectionResultRepository.saveAll(sectionResults);
    this.userAnswersRepository.saveAll(Collections.singletonList(userAnswers));

    return currentAttempt;
  }




}
