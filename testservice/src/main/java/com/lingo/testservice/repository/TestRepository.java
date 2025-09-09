package com.lingo.testservice.repository;

import com.lingo.testservice.model.Test;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TestRepository extends JpaRepository<Test, Long> {

    Optional<Test> findTopByTitle(String tittle);
}
