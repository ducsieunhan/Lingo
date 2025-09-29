package com.lingo.fileservice.domain;

import org.springframework.web.multipart.MultipartFile;

import com.google.auto.value.AutoValue.Builder;
import com.lingo.fileservice.enums.FileCategory;

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
public class FileUpdateDTO {
    FileDeleteDTO fileDeleteDTO;
    String testTitle;
    FileCategory fileCategory;
    String resourceContent;
}
