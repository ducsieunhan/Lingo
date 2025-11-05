package com.lingo.testservice.controller;

import com.lingo.testservice.model.Test;
import com.lingo.testservice.model.dto.request.test.ReqCreateTestDTO;
import com.lingo.testservice.model.dto.request.test.ReqUpdateTestDTO;
import com.lingo.testservice.model.dto.response.ResPaginationDTO;
import com.lingo.testservice.model.dto.response.ResTestDTO;
import com.lingo.testservice.service.TestService;
import com.turkraft.springfilter.boot.Filter;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
public class    TestController {
    private final TestService testService;

    // notice that do not pass questions and resource to request body
    @PostMapping("/add")
    @CacheEvict(value = "allTests", allEntries = true)
    public ResTestDTO add(@RequestBody ReqCreateTestDTO dto) {
        return testService.add(dto);
    }

    @PutMapping("/update/{id}")
    @CacheEvict(value = "allTests", allEntries = true)
    public ResTestDTO update(@RequestBody ReqUpdateTestDTO dto, @PathVariable("id") long id) {
        return testService.update(id, dto);
    }

    @DeleteMapping("/delete/{id}")
    @CacheEvict(value = "allTests", allEntries = true)
    public void delete(@PathVariable long id) {
        testService.delete(id);
    }

    @GetMapping("/all")
    public ResponseEntity<ResPaginationDTO> getAll(@Filter Specification<Test> spec, Pageable pageable) {
        return ResponseEntity.ok(testService.getAll(spec, pageable));
    }

    @GetMapping("/{id}")
    public ResTestDTO getOne(@PathVariable long id) throws Exception {
        return testService.getOne(id);
    }
}
