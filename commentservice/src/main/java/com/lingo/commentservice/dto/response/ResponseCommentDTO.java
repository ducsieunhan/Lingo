package com.lingo.commentservice.dto.response;

import com.lingo.commentservice.enums.CommentStatus;
import com.lingo.commentservice.enums.CommentType;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.Instant;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ResponseCommentDTO {
    long id;
    long testId;
    long replyId;
    String testTitle;
    String userId;
    String content;
    String avatar;
    String username;
    CommentStatus status;
    CommentType type;
    Instant createdAt;
    Instant updatedAt;
    List<ReplyOfComment> replies;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    @FieldDefaults(level = AccessLevel.PRIVATE)
    public static class ReplyOfComment{
        long id;
        long testId;
        long replyId;
        String userId;
        String content;
        String avatar;
        String username;
        CommentStatus status;
        CommentType type;
        Instant createdAt;
        Instant updatedAt;
    }

}
