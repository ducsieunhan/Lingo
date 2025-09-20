package com.lingo.attempt.service;

import com.lingo.attempt.dto.ResCorrectAns;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@Component
public class TestServiceFallback implements FeignTestService {

  @Override
  public List<ResCorrectAns> getCorrectAnswer(@RequestBody List<Long> questionIds){
    String[] choices = {"A","B","C","D"};
    Random r= new Random();
    int r1 = r.nextInt(4);

    List<ResCorrectAns> list = new ArrayList<>();
    for(Long id : questionIds) {
      list.add(new ResCorrectAns(id,choices[r1]));
    }
    return list;
  }

}
