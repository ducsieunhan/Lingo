package com.lingo.testservice.mapper;

import com.lingo.testservice.model.Question;

import com.lingo.testservice.model.dto.request.question.ReqQuestionDTO;
import com.lingo.testservice.model.dto.response.ResQuestionDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question toQuestion(ReqQuestionDTO request);

    @Mapping(target = "resourceContent", source = "resource.resourceContent")
    @Mapping(target = "testId", source = "test.id")
    @Mapping(target = "resourceContentId", source = "resource.id")
    @Mapping(target = "updatedAt", source = "updatedAt")
    @Mapping(target = "createdAt", source = "createdAt")
    // @Mapping(target = "explanationResourceContentId", source = "resource.id")
    ResQuestionDTO toQuestionResponse(Question question);
}
