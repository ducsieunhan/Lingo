package com.lingo.testservice.mapper;

import com.lingo.testservice.model.MediaResource;
import com.lingo.testservice.model.dto.request.resource.ReqMediaResourceDTO;
import com.lingo.testservice.model.dto.response.ResMediaResourceDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MediaResourceMapper {
    MediaResource toMediaResource(ReqMediaResourceDTO request);

    @Mapping(target = "updatedAt", source = "updatedAt")
    @Mapping(target = "createdAt", source = "createdAt")
    ResMediaResourceDTO toMediaResponse(MediaResource resource);
}
