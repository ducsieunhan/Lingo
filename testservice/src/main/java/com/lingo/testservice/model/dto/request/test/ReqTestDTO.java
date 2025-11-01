package com.lingo.testservice.model.dto.request.test;

import com.lingo.testservice.utils.enums.TestType;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReqTestDTO {
    String title;
    int maxScore;
    int timeLimit;
    @Nullable
    int numOfQuestions;
    @Enumerated(EnumType.STRING)
    TestType type;

    // save test info first and then save question, resource after so that do not need to assign question and test object
//    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL)
//    List<Question> questions;
//    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL)
//    List<MediaResource> resources;
//    @OneToOne(mappedBy = "test", cascade = CascadeType.ALL)
}
