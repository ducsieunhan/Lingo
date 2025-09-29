package com.lingo.fileservice.domain;

import com.lingo.fileservice.enums.MediaResourceCategory;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReqUpdateQuestionDTO {
    String title;
    long point;
    // fe pass question id to save key
    String answerKey;
    String explanation;
    String part;
    int questionNumber;
    MediaResourceCategory category;
    String resourceContent;
    String explanationResourceContent;
    String testTitle;
}
