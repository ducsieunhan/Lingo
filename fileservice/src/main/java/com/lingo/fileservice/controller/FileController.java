package com.lingo.fileservice.controller;

import java.io.IOException;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.lingo.fileservice.domain.FileResponse;
import com.lingo.fileservice.service.FileService;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

import org.springframework.web.bind.annotation.PostMapping;

@RestController
@RequestMapping("/api/v1/file")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class FileController {

    final FileService fileService;

    @PostMapping("/upload")
    public ResponseEntity<FileResponse> uploadFile(@RequestParam(name = "file", required = false) MultipartFile file,
            @RequestParam("testTitle") String testTitle)
            throws IOException {
        FileResponse response = fileService.uploadSingleFile(file, testTitle);

        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/uploadMany")
    public ResponseEntity<List<FileResponse>> uploadMultipleFiles(
            @RequestParam(name = "files", required = false) List<MultipartFile> files,
            @RequestParam("testTitle") String testTitle)
            throws IOException {
        List<FileResponse> response = fileService.uploadMultipleFiles(files, testTitle);

        return ResponseEntity.ok().body(response);
    }

}
