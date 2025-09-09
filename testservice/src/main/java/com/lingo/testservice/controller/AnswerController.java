package com.lingo.testservice.controller;

import com.lingo.testservice.model.dto.request.answer.ReqAnswerDTO;
import com.lingo.testservice.model.dto.response.ResAnswerDTO;
import com.lingo.testservice.service.AnswerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/answer")
@RequiredArgsConstructor
public class AnswerController {
    private final AnswerService answerService;

    @PostMapping("/add")
    public ResAnswerDTO add(@RequestBody ReqAnswerDTO dto) {
        return answerService.add(dto);
    }

    @PutMapping("/update/{id}")
    public ResAnswerDTO update(@RequestBody ReqAnswerDTO dto, @PathVariable("id") long id) {
        return answerService.update(dto, id);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable long id) {
        answerService.delete(id);
    }

    @GetMapping("/all")
    public List<ResAnswerDTO> getAll() {
        return answerService.getAll();
    }

    @GetMapping("/one/{id}")
    public ResAnswerDTO getOne(@PathVariable long id) throws Exception {
        return answerService.getOne(id);
    }

    @PostMapping("/bulk")
    public void saveAllAnswers(@RequestBody List<ReqAnswerDTO> answerDTOs) {
        answerService.saveAllAnswers(answerDTOs);
    }

}
