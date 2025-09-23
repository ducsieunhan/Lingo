package com.lingo.testservice.service;

import com.lingo.testservice.mapper.MediaResourceMapper;
import com.lingo.testservice.mapper.TestMapper;
import com.lingo.testservice.model.MediaResource;
import com.lingo.testservice.model.Test;
import com.lingo.testservice.model.dto.request.resource.ReqCreateResourceDTO;
import com.lingo.testservice.model.dto.request.test.ReqCreateTestDTO;
import com.lingo.testservice.model.dto.request.test.ReqUpdateTestDTO;
import com.lingo.testservice.model.dto.response.ResTestDTO;
import com.lingo.testservice.repository.MediaResourceRepository;
import com.lingo.testservice.repository.TestRepository;
import com.lingo.testservice.utils.enums.MediaResourceCategory;

import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

public interface TestService {
    ResTestDTO add(ReqCreateTestDTO dto);

    ResTestDTO update(long id, ReqUpdateTestDTO dto);

    void delete(long id);

    List<ResTestDTO> getAll();

    ResTestDTO getOne(long id) throws Exception;
}

@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Service
class TestServiceImpl implements TestService {
    TestRepository testRepository;
    MediaResourceRepository resourceRepository;
    TestMapper mapper;
    MediaResourceMapper resourceMapper;

    @Override
    @Transactional
    public ResTestDTO add(ReqCreateTestDTO dto) {
        Optional<MediaResource> resourceOptional = resourceRepository.findByResourceContent(dto.getMediaUrl());

        Test test = mapper.toTest(dto);
        Test savedTest = testRepository.save(test);

        resourceOptional.ifPresent(resource -> {
            resource.setTest(savedTest);
            resourceRepository.save(resource);
        });

        ResTestDTO response = mapper.toTestResponse(savedTest);
        resourceOptional.ifPresent(resource -> response.setMediaUrl(resource.getResourceContent()));
        if (!resourceOptional.isPresent()) {
            resourceRepository.save(MediaResource.builder().category(MediaResourceCategory.LISTENING)
                    .resourceContent(dto.getMediaUrl())
                    .test(savedTest).build());
        }
        return response;
    }

    @Override
    public ResTestDTO update(long id, ReqUpdateTestDTO dto) {
        Optional<Test> testOptional = testRepository.findById(id);
        Optional<MediaResource> resourceOptional = resourceRepository.findByResourceContent(dto.getMediaURL());

        testOptional.ifPresent(test -> {
            test.setTitle(dto.getTitle());
            test.setType(dto.getType());
            test.setMaxScore(dto.getMaxScore());
            test.setTimeLimit(dto.getTimeLimit());
            // before update test media resource, should post another api to upload resource
            // to cloud first and save to database then
            if (resourceOptional.isPresent()) {
                test.setResource(resourceOptional.get());
            } else {
                resourceRepository.save(resourceMapper
                        .toMediaResource(ReqCreateResourceDTO.builder().resourceContent(dto.getMediaURL()).build()));
            }
        });

        Test entity = testRepository.save(testOptional.get());
        return mapper.toTestResponse(entity);
    }

    @Override
    public void delete(long id) {
        testRepository.deleteById(id);
    }

    @Override
    public List<ResTestDTO> getAll() {
        return testRepository.findAll().stream().map(mapper::toTestResponse).toList();
    }

    @Override
    public ResTestDTO getOne(long id) throws Exception {
        return mapper.toTestResponse(
                testRepository.findById(id).orElseThrow(() -> new Exception("Test not found")));
    }
}
