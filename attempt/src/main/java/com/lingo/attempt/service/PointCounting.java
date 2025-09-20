package com.lingo.attempt.service;

import com.lingo.attempt.utils.Constants;

public class PointCounting {

  public static double calculatePoint(String type, int countLis, int countRead) {
    if (type.equals("TOEIC")) {
      if(countLis > Constants.TOEIC_PERFECT_SCORE_SECTION &&  countRead > Constants.TOEIC_PERFECT_SCORE_SECTION) {
        return Constants.TOEIC_MAX_TOTAL_SCORE;
      } else if((countLis > 96 &&  countRead < 96) || (countLis < 96 &&  countRead > 96)) {
        return Constants.TOEIC_MAX_SECTION_SCORE + countRead * Constants.TOEIC_POINT_PER_QUESTION;
      }  else
        return (countLis + countRead) * Constants.TOEIC_POINT_PER_QUESTION;
    }
    return 0;
  }

}
