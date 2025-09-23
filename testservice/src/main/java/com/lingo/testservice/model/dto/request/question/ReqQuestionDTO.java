package com.lingo.testservice.model.dto.request.question;

import com.lingo.testservice.model.Test;
import com.lingo.testservice.utils.enums.MediaResourceCategory;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReqQuestionDTO {
    String title;
    long point;
    // fe pass question id to save key
    String answerKey;
    String explanation;
    String part;
    MediaResourceCategory category;

    // @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    // List<Answer> answers;
    // @OneToOne(mappedBy = "question", cascade = CascadeType.ALL)
    // MediaResource resource;
}
