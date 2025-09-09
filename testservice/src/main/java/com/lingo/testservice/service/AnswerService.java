package com.lingo.testservice.service;

import com.lingo.testservice.mapper.AnswerMapper;
import com.lingo.testservice.model.Answer;
import com.lingo.testservice.model.dto.request.answer.ReqAnswerDTO;
import com.lingo.testservice.model.dto.response.ResAnswerDTO;
import com.lingo.testservice.repository.AnswerRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

public interface AnswerService {
    ResAnswerDTO add(ReqAnswerDTO answerDTO);

    ResAnswerDTO update(ReqAnswerDTO answerDTO, long id);

    void delete(long id);

    List<ResAnswerDTO> getAll();

    ResAnswerDTO getOne(long id) throws Exception;

    void saveAllAnswers(List<ReqAnswerDTO> list);
}

@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
class AnswerServiceImpl implements AnswerService {
    AnswerRepository answerRepository;
    AnswerMapper answerMapper;

    @Override
    public ResAnswerDTO add(ReqAnswerDTO answerDTO) {
        Answer answer = answerMapper.toAnswer(answerDTO);
        answer = answerRepository.save(answer);
        return answerMapper.toResAnswerDTO(answer);
    }

    @Override
    public ResAnswerDTO update(ReqAnswerDTO answerDTO, long id) {
        Optional<Answer> answerOptional = answerRepository.findById(id);
        answerOptional.ifPresent(answer -> {
            answer.setContent(answerDTO.getContent());
            answer.setCorrect(answerDTO.getCorrect());
        });

        Answer answer = answerRepository.save(answerOptional.get());
        return answerMapper.toResAnswerDTO(answer);
    }

    @Override
    public void delete(long id) {
        answerRepository.deleteById(id);
    }

    @Override
    public List<ResAnswerDTO> getAll() {
        return answerRepository.findAll().stream().map(answerMapper::toResAnswerDTO).toList();
    }

    @Override
    public ResAnswerDTO getOne(long id) throws Exception {
        return answerMapper.toResAnswerDTO(
                answerRepository.findById(id).orElseThrow(() -> new Exception("Answer not found")));
    }

    @Override
    public void saveAllAnswers(List<ReqAnswerDTO> listRequest) {
        List<Answer> answers = listRequest.stream()
                .map(answerMapper::toAnswer)
                .collect(Collectors.toList());
        answerRepository.saveAll(answers);
    }
}
