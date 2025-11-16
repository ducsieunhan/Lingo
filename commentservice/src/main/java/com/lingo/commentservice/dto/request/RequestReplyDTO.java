package com.lingo.commentservice.dto.request;

import com.lingo.commentservice.enums.CommentType;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class RequestReplyDTO {
    String userId;
    String commentOwnerId;
    Long replyId;
    Long testId;
    String content;
    CommentType type;
}
