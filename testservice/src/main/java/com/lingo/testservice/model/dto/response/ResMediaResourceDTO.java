package com.lingo.testservice.model.dto.response;

import com.lingo.testservice.model.Question;
import com.lingo.testservice.model.Test;
import com.lingo.testservice.utils.enums.MediaResourceCategory;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResMediaResourceDTO {
    long id;
    String resourceContent;
    String explanationResourceContent;
    String description;
    MediaResourceCategory category;
    long testId;
    long questionId;
    Instant createdAt;
    Instant updatedAt;
}
