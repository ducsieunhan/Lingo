package com.lingo.fileservice.domain;

import com.google.auto.value.AutoValue.Builder;

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
public class ReqUpdateResourceDTO {
    String resourceContent;
    String explanationResourceContent;
    String description;
    String category;
    // String testTitle;
}
