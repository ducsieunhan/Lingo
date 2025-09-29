package com.lingo.fileservice.httpclient;

import com.lingo.fileservice.domain.ReqUpdateResourceDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient(name = "test-service", url = "http://localhost:9002/api/v1/resource")
public interface MediaResourceClient {
    @PutMapping(value = "/update/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    void updateMediaResource(@RequestBody ReqUpdateResourceDTO resource,
            @PathVariable("id") long id);
}