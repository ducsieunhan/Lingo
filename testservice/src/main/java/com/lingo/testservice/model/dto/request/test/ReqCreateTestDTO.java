package com.lingo.testservice.model.dto.request.test;

import lombok.*;
import lombok.experimental.FieldDefaults;

@EqualsAndHashCode(callSuper = true)
@Data
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReqCreateTestDTO extends ReqTestDTO {
    String mediaUrl;
}
