package com.lingo.testservice.model;

import com.lingo.testservice.utils.enums.MediaResourceCategory;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "questions")
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String title;
    long point;
    // fe pass question id to save key
    String answerKey;
    String explanation;
    String part;
    int questionNumber;
    @Enumerated(value = EnumType.STRING)
    MediaResourceCategory category; // for reading or listening
    @ManyToOne
    @JoinColumn(name = "test_id")
    Test test;
    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    List<Answer> answers;
    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "resource_id")
    MediaResource resource;
    String explanationResourceContent;
    @Column(name = "created_at", updatable = false)
    private Instant createdAt;

    @Column(name = "updated_at")
    private Instant updatedAt;

    @PrePersist
    public void handleBeforeCreate() {
        this.createdAt = Instant.now();
    }

    @PreUpdate
    public void handleBeforeUpdate() {
        this.updatedAt = Instant.now();
    }
}
