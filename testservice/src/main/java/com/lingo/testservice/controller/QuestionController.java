package com.lingo.testservice.controller;

import com.lingo.testservice.model.dto.request.question.ReqCreateQuestionDTO;
import com.lingo.testservice.model.dto.request.question.ReqQuestionDTO;
import com.lingo.testservice.model.dto.response.ResQuestionDTO;
import com.lingo.testservice.service.QuestionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/api/v1/question")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    @PostMapping("/add")
    public ResQuestionDTO add(@RequestBody ReqCreateQuestionDTO dto) {
        return questionService.add(dto);
    }

    @PutMapping("/update/{id}")
    public ResQuestionDTO update(@RequestBody ReqQuestionDTO dto, @PathVariable("id") long id) {
        return questionService.update(dto, id);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable long id) {
        questionService.delete(id);
    }

    @GetMapping("/all")
    public List<ResQuestionDTO> getAll() {
        return questionService.getAll();
    }

    @GetMapping("/{id}")
    public ResQuestionDTO getOne(@PathVariable long id) throws Exception {
        return questionService.getOne(id);
    }

    @PostMapping("/bulk")
    public void saveAllQuestion(@RequestBody List<ReqCreateQuestionDTO> list) {
        questionService.saveAll(list);
    }

}
