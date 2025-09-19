package com.lingo.fileservice.service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.google.api.gax.paging.Page;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.storage.Blob;
import com.google.cloud.storage.BlobId;
import com.google.cloud.storage.BlobInfo;
import com.google.cloud.storage.Storage;
import com.google.cloud.storage.StorageOptions;
import com.google.cloud.storage.Storage.BlobListOption;
import com.lingo.fileservice.domain.FileResponse;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

public interface FileService {
        FileResponse uploadSingleFile(MultipartFile file, String testTitle)
                        throws IOException;

        List<FileResponse> uploadMultipleFiles(List<MultipartFile> files, String testTitle) throws IOException;

}

@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE)
@Service
class FileServiceImpl implements FileService {
        @Value("${spring.cloud.gcp.storage.project-id}")
        String projectId;
        @Value("${gcp.storage.bucket-name}")
        String bucketName;
        // @Value("${gcp.storage.object-id}")
        // String objectName;
        @Value("${spring.cloud.gcp.credentials.location}")
        String credentialFilePath;

        public boolean doesFolderExist(String prefix) throws FileNotFoundException, IOException {
                Storage storage = StorageOptions
                                .newBuilder().setProjectId(projectId).setCredentials(ServiceAccountCredentials
                                                .fromStream(new FileInputStream(
                                                                "C:/Project/Lingo/fileservice/src/main/resources/keys/lingo-472101-15e886f10d3f.json")))
                                .build().getService();
                Page<Blob> blobs = storage.list(bucketName, BlobListOption.pageSize(1));
                return blobs.getValues().iterator().hasNext();
        }

        public String createFolder(String projectId, String bucketName, String folderName)
                        throws FileNotFoundException, IOException {
                Storage storage = StorageOptions
                                .newBuilder().setProjectId(projectId).setCredentials(ServiceAccountCredentials
                                                .fromStream(new FileInputStream(
                                                                "C:/Project/Lingo/fileservice/src/main/resources/keys/lingo-472101-15e886f10d3f.json")))
                                .build().getService();
                String objectName = folderName.endsWith("/") ? folderName : folderName + "/";

                BlobInfo blobInfo = BlobInfo.newBuilder(bucketName, objectName).build();

                try {
                        storage.create(blobInfo);
                        System.out.println("Simulated folder '" + folderName + "' created in bucket '" + bucketName
                                        + "'.");
                } catch (Exception e) {
                        System.err.println("Error creating simulated folder: " + e.getMessage());
                }
                return folderName;
        }

        @Override
        public FileResponse uploadSingleFile(MultipartFile file, String testTitle)
                        throws IOException {
                // The ID of your GCP project
                // String projectId = "your-project-id";

                // The ID of your GCS bucket
                // String bucketName = "your-unique-bucket-name";

                // The ID of your GCS object
                // String objectName = "your-object-name";

                // The path to your file to upload
                // String filePath = "path/to/your/file"

                Storage storage = StorageOptions.newBuilder().setProjectId(projectId)
                                .setCredentials(ServiceAccountCredentials
                                                .fromStream(new FileInputStream(
                                                                "C:/Project/Lingo/fileservice/src/main/resources/keys/lingo-472101-15e886f10d3f.json")))
                                .build().getService();
                String objectName = file.getOriginalFilename();
                String sanitizedFileName = objectName.replaceAll(" ", "_");
                sanitizedFileName = sanitizedFileName.replaceAll("[^a-zA-Z0-9._-]", "");
                String folderName = doesFolderExist(testTitle) ? testTitle
                                : createFolder(projectId, bucketName, testTitle);
                // tao unique file name tranh trung ten bi replace
                String finalName = folderName + "/" + System.currentTimeMillis() + "-" + sanitizedFileName;

                BlobId blobId = BlobId.of(bucketName, finalName);
                BlobInfo blobInfo = BlobInfo.newBuilder(blobId).setContentType(file.getContentType()).build();

                // Optional: set a generation-match precondition to avoid potential race
                // conditions and data corruptions. The request returns a 412 error if the
                // preconditions are not met.
                Storage.BlobWriteOption precondition;
                if (storage.get(bucketName, finalName) == null) {
                        // For a target object that does not yet exist, set the DoesNotExist
                        // precondition.
                        // This will cause the request to fail if the object is created before the
                        // request runs.
                        precondition = Storage.BlobWriteOption.doesNotExist();
                } else {
                        // If the destination already exists in your bucket, instead set a
                        // generation-match
                        // precondition. This will cause the request to fail if the existing object's
                        // generation
                        // changes before the request runs.
                        precondition = Storage.BlobWriteOption.generationMatch(
                                        storage.get(bucketName, finalName).getGeneration());
                }
                storage.createFrom(blobInfo, file.getInputStream(), precondition);

                // System.out.println(
                // "File " + filePath + " uploaded to bucket " + bucketName + " as " +
                // objectName);
                FileResponse response = FileResponse.builder().fileName(finalName)
                                .mediaUrl(String.format("https://storage.cloud.google.com/%s/%s", bucketName,
                                                finalName))
                                .message("Upload file successful!")
                                .build();
                return response;
        }

        @Override
        public List<FileResponse> uploadMultipleFiles(List<MultipartFile> files, String testTitle) {
                List<FileResponse> responses = files.stream().map(file -> {
                        try {
                                return uploadSingleFile(file, testTitle);
                        } catch (IOException e) {

                                return FileResponse.builder().fileName(file.getOriginalFilename()).mediaUrl("")
                                                .message("Upload failed: " + e.getMessage()).build();
                        }
                }).collect(Collectors.toList());
                return responses;
        }

}
