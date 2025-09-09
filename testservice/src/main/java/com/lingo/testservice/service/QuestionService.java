package com.lingo.testservice.service;

import com.lingo.testservice.mapper.AnswerMapper;
import com.lingo.testservice.mapper.QuestionMapper;
import com.lingo.testservice.model.Answer;
import com.lingo.testservice.model.MediaResource;
import com.lingo.testservice.model.Question;
import com.lingo.testservice.model.Test;
import com.lingo.testservice.model.dto.request.question.ReqCreateQuestionDTO;
import com.lingo.testservice.model.dto.request.question.ReqQuestionDTO;
import com.lingo.testservice.model.dto.response.ResQuestionDTO;
import com.lingo.testservice.repository.QuestionRepository;
import com.lingo.testservice.repository.TestRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.web.reactive.error.ErrorWebExceptionHandler;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public interface QuestionService {
    ResQuestionDTO add(ReqCreateQuestionDTO dto);

    ResQuestionDTO update(ReqQuestionDTO dto, long id);

    void delete(long id);

    List<ResQuestionDTO> getAll();

    ResQuestionDTO getOne(long id) throws Exception;

    void saveAll(List<ReqCreateQuestionDTO> reqListQuestion);
}

@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
class QuestionServiceImpl implements QuestionService {
    QuestionRepository repository;
    // AnswerRepository answerRepository;
    TestRepository testRepository;
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
        MediaResource resource = MediaResource.builder().mediaUrl(dto.getMediaURL()).question(question).build();
        question.setResource(resource);
        repository.save(question);
        // ResQuestionDTO response=mapper.toQuestionResponse(question);
        // response.setMediaUrl(question.getResource().getMediaUrl());
        return mapper.toQuestionResponse(question);
    }

    @Override
    public ResQuestionDTO update(ReqQuestionDTO dto, long id) {
        Optional<Question> questionOptional = repository.findById(id);
        questionOptional.ifPresent(question -> {
            question.setPart(dto.getPart());
            question.setCategory(dto.getCategory());
            question.setExplanation(dto.getExplanation());
            question.setTitle(dto.getTitle());
            question.setAnswerKey(dto.getAnswerKey());
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
            Optional<Test> testOptional = testRepository.findTopByTitle(dto.getTestTitle());
            testOptional.ifPresent(question::setTest);
            List<Answer> answerList = dto.getAnswers().stream().map(reqAnswerDTO -> {
                Answer answer = answerMapper.toAnswer(reqAnswerDTO);
                // answerRepository.save(answer);
                answer.setQuestion(question);
                return answer;
            }).collect(Collectors.toList());

            question.setAnswers(answerList);
            MediaResource resource = MediaResource.builder().mediaUrl(dto.getMediaURL()).question(question).build();
            question.setResource(resource);
            return question;
        })
                .collect(Collectors.toList());
        repository.saveAll(questions);

    }
}
