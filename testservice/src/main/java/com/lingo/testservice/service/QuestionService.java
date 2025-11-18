package com.lingo.testservice.service;

import com.lingo.testservice.mapper.AnswerMapper;
import com.lingo.testservice.mapper.QuestionMapper;
import com.lingo.testservice.model.Answer;
import com.lingo.testservice.model.MediaResource;
import com.lingo.testservice.model.Question;
import com.lingo.testservice.model.Test;
import com.lingo.testservice.model.dto.request.question.ReqCreateQuestionDTO;
import com.lingo.testservice.model.dto.request.question.ReqQuestionDTO;
import com.lingo.testservice.model.dto.request.question.ReqUpdateQuestionDTO;
import com.lingo.testservice.model.dto.response.ResCorrectAnswerDTO;
import com.lingo.testservice.model.dto.response.ResQuestionDTO;
import com.lingo.testservice.repository.MediaResourceRepository;
import com.lingo.testservice.repository.QuestionRepository;
import com.lingo.testservice.repository.TestRepository;
import com.lingo.testservice.utils.enums.MediaResourceCategory;

import jakarta.transaction.Transactional;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface QuestionService {
    ResQuestionDTO add(ReqCreateQuestionDTO dto);

    ResQuestionDTO update(ReqUpdateQuestionDTO dto, long id);

    void delete(long id);

    List<ResQuestionDTO> getAll();

    ResQuestionDTO getOne(long id) throws Exception;

    void saveAll(List<ReqCreateQuestionDTO> reqListQuestion);

    List<ResQuestionDTO> findByTestId(long Id) throws Exception;

    List<ResCorrectAnswerDTO> getCorrectAnswerOfQuestions(Long testId);

}

@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
class QuestionServiceImpl implements QuestionService {
    QuestionRepository repository;
    // AnswerRepository answerRepository;
    TestRepository testRepository;
    MediaResourceRepository resourceRepository;
    QuestionMapper mapper;
    AnswerMapper answerMapper;

    @Override
    public ResQuestionDTO add(ReqCreateQuestionDTO dto) {
        Question question = mapper.toQuestion(dto);
        Optional<Test> testOptional = testRepository.findTopByTitle(dto.getTestTitle());
        testOptional.ifPresent(question::setTest);
        List<Answer> answerList = dto.getAnswers().stream().map(reqAnswerDTO -> {
            Answer answer = answerMapper.toAnswer(reqAnswerDTO);
            // answerRepository.save(answer);
            answer.setQuestion(question);
            return answer;
        }).collect(Collectors.toList());

        question.setAnswers(answerList);
        MediaResource resource = MediaResource.builder().resourceContent(dto.getResourceContent())
                .questions(List.of(question))
                .build();
        question.setResource(resource);
        question.setExplanationResourceContent(dto.getExplanationResourceContent());
        repository.save(question);
        // ResQuestionDTO response=mapper.toQuestionResponse(question);
        // response.setMediaUrl(question.getResource().getMediaUrl());
        return mapper.toQuestionResponse(question);
    }

    @Transactional
    @Override
    public ResQuestionDTO update(ReqUpdateQuestionDTO dto, long id) {
        Optional<Question> questionOptional = repository.findById(id);

//        Optional<MediaResource> resourceOptional = resourceRepository.findByResourceContent(dto.getResourceContent());
        questionOptional.ifPresent(question -> {
            if (dto.getPart() != null) {
                question.setPart(dto.getPart());
            }
            if (dto.getCategory() != null) {
                question.setCategory(dto.getCategory());
            }
            if (dto.getExplanation() != null) {
                question.setExplanation(dto.getExplanation());
            }
            if (dto.getTitle() != null) {
                question.setTitle(dto.getTitle());
            }
            if (dto.getAnswerKey() != null) {
                question.setAnswerKey(dto.getAnswerKey());
            }
            if (dto.getTitle() != null) {
                question.setTitle(dto.getTitle());
            }
            question.setExplanationResourceContent(dto.getExplanationResourceContent());
            if (question.getResource() != null) {
                MediaResource resource = question.getResource();
                resource.setResourceContent(dto.getResourceContent());
//                resourceRepository.save(resource);
                question.setResource(resource);
            }

        });

        Question question = repository.save(questionOptional.get());
        return mapper.toQuestionResponse(question);
    }

    @Override
    public void delete(long id) {
        repository.deleteById(id);
    }

    @Override
    public List<ResQuestionDTO> getAll() {
        return repository.findAll().stream().map(mapper::toQuestionResponse).toList();
    }

    @Override
    public ResQuestionDTO getOne(long id) throws Exception {
        return mapper.toQuestionResponse(
                repository.findById(id).orElseThrow(() -> new Exception("Question not found")));
    }

    @Override
    public void saveAll(List<ReqCreateQuestionDTO> dtos) {
        List<Question> questions = dtos.stream().map(dto -> {
            Question question = mapper.toQuestion(dto);
            Optional<Test> testOptional = testRepository.findTopByTitle(dto.getTestTitle().replaceAll(" ", "_"));
            testOptional.ifPresent(question::setTest);
            List<Answer> answerList = dto.getAnswers().stream().map(reqAnswerDTO -> {
                Answer answer = answerMapper.toAnswer(reqAnswerDTO);
                // answerRepository.save(answer);
                answer.setQuestion(question);
                return answer;
            }).collect(Collectors.toList());

            question.setAnswers(answerList);
            Optional<MediaResource> existing = resourceRepository.findByResourceContent(dto.getResourceContent());

            MediaResource resource = existing.orElseGet(() -> {
                MediaResource newRes = MediaResource.builder()
                        .resourceContent(dto.getResourceContent())

                        .category(dto.getCategory())
                        .build();
                return resourceRepository.save(newRes);
            });

            question.setResource(resource);
            question.setExplanationResourceContent(dto.getExplanationResourceContent());

            return question;
        })
                .collect(Collectors.toList());
        repository.saveAll(questions);

    }

    @Override
    public List<ResQuestionDTO> findByTestId(long testId) throws Exception {
        List<Question> questions = repository.findAllByTestId(testId);
        if (questions.isEmpty()) {
            throw new Exception("Not found test");
        }
        List<ResQuestionDTO> resQuestions = questions.stream().map(question -> {
            return mapper.toQuestionResponse(question);
        }).collect(Collectors.toList());
        return resQuestions;

    }

    @Override
    public List<ResCorrectAnswerDTO> getCorrectAnswerOfQuestions(Long id){
      try {
        return this.repository.findIdAndAnswerKeyByTestId(id);
      } catch (Exception e) {
        throw new RuntimeException("Error getting correct answer", e);
      }
    }
}
