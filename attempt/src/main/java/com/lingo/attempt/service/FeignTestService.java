package com.lingo.attempt.service;

import com.lingo.attempt.dto.ResCorrectAns;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@FeignClient(value = "test", url = "http://localhost:9002/api/v1/test",
fallback = TestServiceFallback.class)
public interface FeignTestService {

  @PostMapping(value = "/correct", consumes = MediaType.APPLICATION_JSON_VALUE)
  public List<ResCorrectAns> getCorrectAnswer(@RequestBody List<Long> questionIds);
}
