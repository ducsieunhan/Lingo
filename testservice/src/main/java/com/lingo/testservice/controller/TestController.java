package com.lingo.testservice.controller;

import com.lingo.testservice.model.dto.request.test.ReqCreateTestDTO;
import com.lingo.testservice.model.dto.request.test.ReqUpdateTestDTO;
import com.lingo.testservice.model.dto.response.ResTestDTO;
import com.lingo.testservice.service.TestService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/test")
@RequiredArgsConstructor
public class TestController {
    private final TestService testService;

    // notice that do not pass questions and resource to request body
    @PostMapping("/add")
    public ResTestDTO add(@RequestBody ReqCreateTestDTO dto) {
        return testService.add(dto);
    }

    @PutMapping("/update/{id}")
    public ResTestDTO update(@RequestBody ReqUpdateTestDTO dto, @PathVariable("id") long id) {
        return testService.update(id, dto);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable long id) {
        testService.delete(id);
    }

    @GetMapping("/all")
    public List<ResTestDTO> getAll() {
        return testService.getAll();
    }

    @GetMapping("/{id}")
    public ResTestDTO getOne(@PathVariable long id) throws Exception {
        return testService.getOne(id);
    }
}
