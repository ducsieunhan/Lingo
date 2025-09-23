package com.lingo.testservice.model;

import com.lingo.testservice.utils.enums.MediaResourceCategory;
import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "media_resources")
public class MediaResource {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    @Column(name = "resource_content")
    String resourceContent;
    @Column(name = "explanation_resource_url")
    String explanationResourceContent;
    @Nullable
    String description;
    @Enumerated(value = EnumType.STRING)
    MediaResourceCategory category;
    @OneToOne
    @JoinColumn(name = "test_id")
    Test test;
    @OneToOne
    @JoinColumn(name = "question_id")
    Question question;
}
