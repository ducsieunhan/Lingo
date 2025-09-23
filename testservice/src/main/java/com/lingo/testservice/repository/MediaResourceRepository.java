package com.lingo.testservice.repository;

import com.lingo.testservice.model.MediaResource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MediaResourceRepository extends JpaRepository<MediaResource, Long> {
    Optional<MediaResource> findByResourceContent(String resourceContent);
}
