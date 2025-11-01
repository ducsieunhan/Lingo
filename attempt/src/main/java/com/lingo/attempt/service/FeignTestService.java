package com.lingo.attempt.service;

import com.lingo.attempt.dto.ResCorrectAns;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@FeignClient(value = "question", url = "${con.test.url}", path = "/question",
fallback = TestServiceFallback.class)
public interface FeignTestService {

  @GetMapping(value = "/correct/{testId}", consumes = MediaType.APPLICATION_JSON_VALUE)
  List<ResCorrectAns> getCorrectAnswer(@PathVariable("testId") long testId);
}


@Component
class TestServiceFallback implements FeignTestService {

  @Override
  public List<ResCorrectAns> getCorrectAnswer(@PathVariable("testId") long testId){
    String[] choices = {"A","B","C","D"};
    Random r= new Random();
    int r1 = r.nextInt(4);

    List<ResCorrectAns> list = new ArrayList<>();
//    for(Long id : questionIds) {
//      list.add(new ResCorrectAns(id,choices[r1]));
//    }
    return list;
  }

}