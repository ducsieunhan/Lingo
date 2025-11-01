package com.lingo.fileservice.service;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
import com.lingo.fileservice.domain.FileDeleteDTO;
import com.lingo.fileservice.domain.FileResponse;
import com.lingo.fileservice.domain.ReqUpdateQuestionDTO;
import com.lingo.fileservice.domain.ReqUpdateResourceDTO;
import com.lingo.fileservice.enums.FileCategory;
import com.lingo.fileservice.httpclient.MediaResourceClient;
import com.lingo.fileservice.httpclient.QuestionClient;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

public interface FileService {
        FileResponse uploadSingleFile(MultipartFile file, String testTitle, FileCategory fileCategory)
                        throws IOException;

        List<FileResponse> uploadMultipleFiles(MultipartFile[] files, String testTitle, FileCategory fileCategory)
                        throws IOException;

        void deleteFile(FileDeleteDTO dto) throws IOException;

        FileResponse updateMediaResource(ReqUpdateResourceDTO resourceDTO, String objectName, MultipartFile file,
                        String testTitle, FileCategory fileCategory, long id)
                        throws IOException, Exception;

        FileResponse updateMediaResource(String objectName, MultipartFile file,
                        String testTitle, FileCategory fileCategory, ReqUpdateQuestionDTO questionDTO,
                        long questionId)
                        throws IOException, Exception;

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

        final MediaResourceClient mediaResourceClient;
        final QuestionClient questionClient;

        Logger log = LoggerFactory.getLogger(FileServiceImpl.class);

        public boolean doesFolderExist(String prefix) throws FileNotFoundException, IOException {
                Storage storage = StorageOptions
                                .newBuilder().setProjectId(projectId)
                        .setCredentials(ServiceAccountCredentials
                                .fromStream(Objects.requireNonNull(this.getClass().getClassLoader()
                                        .getResourceAsStream("keys/lingo-472101-15e886f10d3f.json"))))
                        .build().getService();
                Page<Blob> blobs = storage.list(bucketName, BlobListOption.pageSize(1));
                return blobs.getValues().iterator().hasNext();
        }

        public String createFolder(String projectId, String bucketName, String folderName)
                        throws FileNotFoundException, IOException {
                Storage storage = StorageOptions
                                .newBuilder().setProjectId(projectId)
                        .setCredentials(ServiceAccountCredentials
                                .fromStream(Objects.requireNonNull(this.getClass().getClassLoader()
                                        .getResourceAsStream("keys/lingo-472101-15e886f10d3f.json"))))
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
        public FileResponse uploadSingleFile(MultipartFile file, String testTitle, FileCategory fileCategory)
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
                                .fromStream(Objects.requireNonNull(this.getClass().getClassLoader()
                                        .getResourceAsStream("keys/lingo-472101-15e886f10d3f.json"))))
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
                                .fileCategory(fileCategory)
                                .build();
                log.info(">>>>>Upload " + finalName + "successfully");
                return response;
        }

        @Override
        public List<FileResponse> uploadMultipleFiles(MultipartFile[] files, String testTitle,
                        FileCategory fileCategory) {

                List<FileResponse> responses = Arrays.stream(files).map(file -> {
                        try {
                                return uploadSingleFile(file, testTitle, fileCategory);
                        } catch (IOException e) {

                                return FileResponse.builder().fileName(file.getOriginalFilename()).mediaUrl("")
                                                .message("Upload failed: " + e.getMessage()).build();
                        }
                }).collect(Collectors.toList());
                return responses;
        }

        @Override
        public void deleteFile(FileDeleteDTO dto) throws IOException {
                Storage storage = StorageOptions
                                .newBuilder().setProjectId(projectId)
                        .setCredentials(ServiceAccountCredentials
                                .fromStream(Objects.requireNonNull(this.getClass().getClassLoader()
                                        .getResourceAsStream("keys/lingo-472101-15e886f10d3f.json"))))
                                .build().getService();
                Blob blob = storage.get(bucketName, dto.getUpdatedFileName());
                if (blob == null) {
                        System.out.println("The object " + dto.getUpdatedFileName() + " wasn't found in " + bucketName);
                        return;
                }
                BlobId idWithGeneration = blob.getBlobId();
                // Deletes the blob specified by its id. When the generation is present and
                // non-null it will be
                // specified in the request.
                // If versioning is enabled on the bucket and the generation is present in the
                // delete request,
                // only the version of the object with the matching generation will be deleted.
                // If instead you want to delete the current version, the generation should be
                // dropped by
                // performing the following.
                // BlobId idWithoutGeneration =
                // BlobId.of(idWithGeneration.getBucket(), idWithGeneration.getName());
                // storage.delete(idWithoutGeneration);
                storage.delete(idWithGeneration);

                System.out.println(
                                "Object " + dto.getUpdatedFileName() + " was permanently deleted from " + bucketName);
        }

        @Override
        public FileResponse updateMediaResource(ReqUpdateResourceDTO resourceDTO, String objectName, MultipartFile file,
                        String testTitle, FileCategory fileCategory, long resourceId)
                        throws IOException, Exception {
                if (objectName == null || objectName.isEmpty()) {
                        throw new IllegalArgumentException("Object name cannot be null or empty");
                }
                if (file == null || file.isEmpty()) {
                        throw new IllegalArgumentException("File cannot be null or empty");
                }
                if (resourceDTO == null) {
                        throw new IllegalArgumentException("Resource DTO cannot be null");
                }

                try {
                        // Upload new file first to ensure it succeeds before deleting the old one
                        FileResponse response = uploadSingleFile(file, testTitle, fileCategory);
                        resourceDTO.setResourceContent(response.getMediaUrl());

                        // Call external service to update resource
                        mediaResourceClient.updateMediaResource(resourceDTO, resourceId);

                        // Delete old file after successful upload and external service call
                        deleteFile(new FileDeleteDTO(objectName));

                        return response;
                } catch (Exception e) {
                        log.error("Failed to update media resource: {}", e.getMessage());
                        throw e;
                }
        }

        @Override
        public FileResponse updateMediaResource(String objectName, MultipartFile file, String testTitle,
                        FileCategory fileCategory, ReqUpdateQuestionDTO questionDTO, long questionId)
                        throws IOException, Exception {
                if (objectName == null || objectName.isEmpty()) {
                        throw new IllegalArgumentException("Object name cannot be null or empty");
                }
                if (file == null || file.isEmpty()) {
                        throw new IllegalArgumentException("File cannot be null or empty");
                }
                try {
                        // Upload new file first to ensure it succeeds before deleting the old one
                        FileResponse response = uploadSingleFile(file, testTitle, fileCategory);
                        questionDTO.setExplanationResourceContent(response.getMediaUrl());
                        questionClient.updateQuestion(questionDTO, questionId);

                        // Delete old file after successful upload and external service call
                        deleteFile(new FileDeleteDTO(objectName));

                        return response;
                } catch (Exception e) {
                        log.error("Failed to update media resource: {}", e.getMessage());
                        throw e;
                }
        }

}
