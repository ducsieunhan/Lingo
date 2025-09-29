package com.lingo.fileservice.domain;

import java.util.List;

import com.google.auto.value.AutoValue.Builder;
import com.lingo.fileservice.enums.MediaResourceCategory;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResQuestionDTO {
    long id;
    String title;
    long point;
    // fe pass question id to save key
    String answerKey;
    String explanation;
    String part;
    int questionNumber;
    long testId;
    List<ResAnswerDTO> answers;
    MediaResourceCategory category;
    String resourceContent;
    String explanationResourceContent;
    long resourceContentId;
    long explanationResourceContentId;
}
