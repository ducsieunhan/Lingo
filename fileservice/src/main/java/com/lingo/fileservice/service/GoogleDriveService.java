package com.lingo.fileservice.service;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.api.client.http.FileContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.lingo.fileservice.domain.ResFile;

@Service
public class GoogleDriveService {

    @Autowired
    private Drive googleDrive;

    public ResFile uploadFile(java.io.File fileToUpload, String fileName, String parentFolderId) {
        try {
            // Google Drive file metadata
            File driveFileMetadata = new File();
            driveFileMetadata.setName(fileName);
            if (parentFolderId != null && !parentFolderId.isEmpty()) {
                driveFileMetadata.setParents(java.util.Collections.singletonList(parentFolderId));
            }

            // File content (set MIME type based on your needs)
            FileContent mediaContent = new FileContent("application/zip", fileToUpload);

            // Upload file
            File uploadedFile = googleDrive.files()
                    .create(driveFileMetadata, mediaContent)
                    .setFields("id, webViewLink")
                    .execute();

            return ResFile.builder()
                    .status(200)
                    .mediaUrl(uploadedFile.getWebViewLink())
                    .message("File uploaded successfully")
                    .build();

        } catch (IOException e) {
            return ResFile.builder()
                    .status(500)
                    .mediaUrl(null)
                    .message("Upload failed: " + e.getMessage())
                    .build();
        }
    }
}
