package com.lingo.testservice.model.dto.request.resource;

import com.lingo.testservice.model.Question;
import com.lingo.testservice.model.Test;
import com.lingo.testservice.utils.enums.MediaResourceCategory;
import jakarta.annotation.Nullable;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class ReqMediaResourceDTO {

    String resourceContent;
    String explanationResourceContent;
    @Nullable
    String description;
    MediaResourceCategory category;
}
