package com.lingo.commentservice.dto.request;

import com.lingo.commentservice.enums.CommentType;
import jakarta.annotation.Nullable;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RequestCommentDTO {
    String userId;
    String commentOwnerId;
    Long testId;
    String testTitle;
    @Nullable
    Long replyId;
    String content;
    CommentType type;
}
