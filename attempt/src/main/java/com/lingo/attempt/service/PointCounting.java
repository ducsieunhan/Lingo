package com.lingo.attempt.service;

import com.lingo.attempt.utils.Constants;

public class PointCounting {

  public static double[] calculatePoint(String type, int[] count) {
    if (type.equals("TOEIC")) {
      if(count[0] > Constants.TOEIC_PERFECT_SCORE_SECTION &&  count[1] > Constants.TOEIC_PERFECT_SCORE_SECTION) {
        return new double[]{Constants.TOEIC_MAX_SECTION_SCORE, Constants.TOEIC_MAX_SECTION_SCORE};
      } else if(count[0] > 96 && count[1] <= 96) {
        // Listening > 96, Reading <= 96
        return new double[]{Constants.TOEIC_MAX_SECTION_SCORE, count[1] * Constants.TOEIC_POINT_PER_QUESTION};
      } else if(count[0] <= 96 && count[1] > 96) {
        // Listening <= 96, Reading > 96
        return new double[]{count[0] * Constants.TOEIC_POINT_PER_QUESTION, Constants.TOEIC_MAX_SECTION_SCORE};
      } else {
        // Cả hai kỹ năng <= 96
        return new double[]{count[0] * Constants.TOEIC_POINT_PER_QUESTION, count[1] * Constants.TOEIC_POINT_PER_QUESTION};
      }
    }
    return new double[]{0, 0};
  }
}