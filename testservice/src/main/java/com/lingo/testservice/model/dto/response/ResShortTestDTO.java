package com.lingo.testservice.model.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResShortTestDTO {

   private long id;
   private String title;
   private int maxScore;
   private int timeLimit;
   private int numOfQuestions;
   private int attempts;

}
