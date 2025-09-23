package com.lingo.testservice.service;

import com.lingo.testservice.mapper.MediaResourceMapper;
import com.lingo.testservice.model.MediaResource;

import com.lingo.testservice.model.dto.request.resource.ReqMediaResourceDTO;
import com.lingo.testservice.model.dto.response.ResMediaResourceDTO;
import com.lingo.testservice.repository.MediaResourceRepository;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

public interface MediaResourceService {
    ResMediaResourceDTO add(ReqMediaResourceDTO dto);

    ResMediaResourceDTO update(ReqMediaResourceDTO dto, long id);

    void delete(long id);

    List<ResMediaResourceDTO> getAll();

    ResMediaResourceDTO getOne(long id) throws Exception;
}

@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
class MediaResourceServiceImpl implements MediaResourceService {
    MediaResourceRepository repository;
    MediaResourceMapper mapper;
    // TestRepository testRepository;
    // QuestionRepository questionRepository;

    @Override
    public ResMediaResourceDTO add(ReqMediaResourceDTO dto) {
        // Optional<Test> testOptional=testRepository.findById(dto.getTestId());
        // Optional<Question>
        // questionOptional=questionRepository.findById(dto.getQuestionId());

        MediaResource resource = mapper.toMediaResource(dto);
        // testOptional.ifPresent(resource::setTest);
        // questionOptional.ifPresent(resource::setQuestion);
        repository.save(resource);
        return mapper.toMediaResponse(resource);
    }

    @Override
    public ResMediaResourceDTO update(ReqMediaResourceDTO dto, long id) {
        Optional<MediaResource> resourceOptional = repository.findById(id);
        resourceOptional.ifPresent(resource -> {
            resource.setResourceContent(dto.getResourceContent());
            resource.setExplanationResourceContent(dto.getExplanationResourceContent());
            if (dto.getDescription() != null) {
                resource.setDescription(dto.getDescription());
            }
        });
        MediaResource resource = resourceOptional.get();
        resource = repository.save(resource);
        return mapper.toMediaResponse(resource);
    }

    @Override
    public void delete(long id) {
        repository.deleteById(id);
    }

    @Override
    public List<ResMediaResourceDTO> getAll() {
        return repository.findAll().stream().map(mapper::toMediaResponse).toList();
    }

    @Override
    public ResMediaResourceDTO getOne(long id) throws Exception {
        return mapper.toMediaResponse(
                repository.findById(id).orElseThrow(() -> new Exception("MediaResource not found")));
    }
}
