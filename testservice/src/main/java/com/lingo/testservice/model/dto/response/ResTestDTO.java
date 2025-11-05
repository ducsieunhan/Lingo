package com.lingo.testservice.model.dto.response;

import com.lingo.testservice.utils.enums.TestCategory;
import com.lingo.testservice.utils.enums.TestType;

import lombok.*;
import lombok.experimental.FieldDefaults;

import java.io.Serializable;
import java.time.Instant;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResTestDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    long id;
    String title;
    int maxScore;
    int timeLimit;
    TestType type;
    // List<Long> questions;
    String mediaUrl;
    TestCategory category;
    int numOfQuestions;
    int attempts;
    long resourceContentId;
    Instant createdAt;
    Instant updatedAt;


}
