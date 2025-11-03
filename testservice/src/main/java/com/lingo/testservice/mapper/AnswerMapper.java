package com.lingo.testservice.mapper;

import com.lingo.testservice.model.Answer;
import com.lingo.testservice.model.dto.request.answer.ReqAnswerDTO;
import com.lingo.testservice.model.dto.response.ResAnswerDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    Answer toAnswer(ReqAnswerDTO request);

    @Mapping(target = "updatedAt", source = "updatedAt")
    @Mapping(target = "createdAt", source = "createdAt")
    ResAnswerDTO toResAnswerDTO(Answer answer);
}
