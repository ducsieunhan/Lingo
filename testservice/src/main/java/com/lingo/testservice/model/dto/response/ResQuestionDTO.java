package com.lingo.testservice.model.dto.response;

import com.lingo.testservice.model.Answer;
import com.lingo.testservice.model.MediaResource;
import com.lingo.testservice.model.Test;
import lombok.*;
import lombok.experimental.FieldDefaults;
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
    long answerKey;
    String explanation;
    String part;
    long testId;
    List<ResAnswerDTO> answers;
    String resourceContent;
    String explanationResourceContent;
}
