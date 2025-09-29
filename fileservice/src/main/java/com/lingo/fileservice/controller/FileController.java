package com.lingo.fileservice.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.lingo.fileservice.domain.FileDeleteDTO;
import com.lingo.fileservice.domain.FileResponse;
import com.lingo.fileservice.domain.FileUpdateDTO;
import com.lingo.fileservice.domain.ReqUpdateQuestionDTO;
import com.lingo.fileservice.domain.ReqUpdateResourceDTO;
import com.lingo.fileservice.enums.FileCategory;
import com.lingo.fileservice.service.FileService;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;

@RestController
@RequestMapping("/api/v1/file")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FileController {

    final FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<FileResponse> uploadFile(@RequestParam(name = "file", required = false) MultipartFile file,
            @RequestParam("testTitle") String testTitle, @RequestParam("fileCategory") FileCategory fileCategory)
            throws IOException {
        FileResponse response = fileService.uploadSingleFile(file, testTitle, fileCategory);

        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/uploadMany")
    public ResponseEntity<List<FileResponse>> uploadMultipleFiles(
            @RequestParam(name = "files", required = false) MultipartFile[] files,
            @RequestParam("testTitle") String testTitle,
            @RequestParam("fileCategory") FileCategory fileCategory)
            throws IOException {
        List<FileResponse> response = fileService.uploadMultipleFiles(files, testTitle, fileCategory);

        return ResponseEntity.ok().body(response);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Void> deleteSingleFIle(@RequestBody FileDeleteDTO updatedFileName) throws IOException {
        fileService.deleteFile(updatedFileName);
        return ResponseEntity.ok().body(null);
    }

    @PutMapping("/updateContent/{resourceId}")
    public ResponseEntity<FileResponse> updateFileAndMediaResource(
            @RequestParam("file") @NotNull MultipartFile file,
            @RequestParam("testTitle") @NotBlank String testTitle,
            @RequestParam("fileCategory") @NotNull FileCategory fileCategory,
            @RequestParam("currentResourceContent") @NotBlank String currentResourceContent,
            @RequestParam("updatedFileName") @NotBlank String updatedFileName,
            @PathVariable("resourceId") long resourceId) throws IOException, Exception {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is required");
        }
        ReqUpdateResourceDTO resourceDTO = new ReqUpdateResourceDTO();
        FileResponse response = fileService.updateMediaResource(resourceDTO, updatedFileName, file, testTitle,
                fileCategory, resourceId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/updateExplanation/{questionId}")
    public ResponseEntity<FileResponse> updateExplanationResourceContent(
            @RequestParam("file") @NotNull MultipartFile file,
            @RequestParam("testTitle") @NotBlank String testTitle,
            @RequestParam("fileCategory") @NotNull FileCategory fileCategory,
            @RequestParam("currentResourceContent") @NotBlank String currentResourceContent,
            @RequestParam("updatedFileName") @NotBlank String updatedFileName,
            @PathVariable("questionId") long questionId
    // @RequestBody ReqUpdateQuestionDTO questionDTO
    ) throws IOException, Exception {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("File is required");
        }
        ReqUpdateQuestionDTO questionDTO = new ReqUpdateQuestionDTO();

        FileResponse response = fileService.updateMediaResource(updatedFileName, file, testTitle, fileCategory,
                questionDTO, questionId);
        return ResponseEntity.ok(response);
    }

}
