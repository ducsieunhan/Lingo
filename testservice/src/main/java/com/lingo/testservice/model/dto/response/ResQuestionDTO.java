package com.lingo.testservice.model.dto.response;

import com.lingo.testservice.model.Answer;
import com.lingo.testservice.model.MediaResource;
import com.lingo.testservice.model.Test;
import com.lingo.testservice.utils.enums.MediaResourceCategory;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

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
    Instant createdAt;
    Instant updatedAt;
}
