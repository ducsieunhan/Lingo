package com.lingo.account.repository;

import com.lingo.account.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Collection;
import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Long> {
  Role findByName(String name);

  List<Role> findAllByNameIn(Collection<String> names);
}
