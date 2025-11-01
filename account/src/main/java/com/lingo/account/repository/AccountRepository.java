package com.lingo.account.repository;

import com.lingo.account.model.Account;
import com.lingo.account.model.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, Long>, JpaSpecificationExecutor<Account>{

  Optional<Account> findByEmail(String email);

  Optional<Object> findByUsername(String username);

  Optional<Object> findByKeycloakId(String keycloakId);

  List<Role> findAllByUsernameIn(Collection<String> usernames);

//  @Query(value = "SELECT DISTINCT a.* FROM accounts a " +
//          "LEFT JOIN users_roles ur ON a.keycloak_id = ur.user_id " +
//          "LEFT JOIN roles r ON ur.role_id = r.id " +
//          "WHERE (:roles IS NULL OR :roles IS EMPTY OR r.name IN :roles) " +
//          "AND (:username IS NULL OR :username = '' OR a.username = :username) " +
//          "AND (:email IS NULL OR :email = '' OR a.email = :email) " +
//          "AND a.enable = :enable " +
//          "AND (:from IS NULL OR :to IS NULL OR a.created_at BETWEEN :from AND :to) " +
//          "ORDER BY a.id ASC",
//          countQuery = "SELECT COUNT(DISTINCT a.id) FROM accounts a " +
//                  "LEFT JOIN users_roles ur ON a.keycloak_id = ur.user_id " +
//                  "LEFT JOIN roles r ON ur.role_id = r.id " +
//                  "WHERE (:roles IS NULL OR :roles IS EMPTY OR r.name IN :roles) " +
//                  "AND (:username IS NULL OR :username = '' OR a.username = :username) " +
//                  "AND (:email IS NULL OR :email = '' OR a.email = :email) " +
//                  "AND a.enable = :enable " +
//                  "AND (:from IS NULL OR :to IS NULL OR a.created_at BETWEEN :from AND :to)",
//          nativeQuery = true)
//  Page<Account> findAccountsByFilters(@Param("username") String username,
//                                      @Param("email") String email,
//                                      @Param("roles") List<String> roles,
//                                      @Param("enable") boolean enable,
//                                      @Param("from") Long from,
//                                      @Param("to") Long to,
//                                      Pageable pageable);
}
