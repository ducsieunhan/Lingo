package com.lingo.testservice.model;

import com.lingo.testservice.utils.enums.TestCategory;
import com.lingo.testservice.utils.enums.TestType;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "tests")
public class Test {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @Column(unique = true)
    String title;
    int maxScore;
    int timeLimit;
    @Enumerated(EnumType.STRING)
    TestType type;
    @Enumerated(EnumType.STRING)
    TestCategory category;
    int attempts;
    int numOfQuestions;
    @OneToMany(mappedBy = "test", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    List<Question> questions;
    // @OneToMany(mappedBy = "test", cascade = CascadeType.ALL)
    // List<MediaResource> resources;
    @OneToOne(mappedBy = "test", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    MediaResource resource;
}
