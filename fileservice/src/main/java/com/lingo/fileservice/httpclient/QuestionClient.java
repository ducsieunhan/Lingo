package com.lingo.fileservice.httpclient;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.lingo.fileservice.domain.ReqUpdateQuestionDTO;

@FeignClient(name = "question-service", url = "http://localhost:9002/api/v1/question")
public interface QuestionClient {
    @PutMapping(value = "/update/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    void updateQuestion(@RequestBody ReqUpdateQuestionDTO dto, @PathVariable("id") long id);
}
