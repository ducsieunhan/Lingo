package com.lingo.account.repository;

import com.lingo.account.model.Account;
import com.lingo.account.model.Role;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AccountSpecifications {

  public static Specification<Account> hasUsername(String username) {
    return (root, query, cb) -> {
      if (username == null || username.trim().isEmpty()) {
        return cb.conjunction();
      }
      return cb.like(root.get("username"),"%" + username + "%");
    };
  }

  public static Specification<Account> hasEmail(String email) {
    return (root, query, cb) -> {
      if (email == null || email.trim().isEmpty()) {
        return cb.conjunction();
      }
      return cb.like(root.get("email"),"%" + email + "%");
    };
  }

  public static Specification<Account> hasRoles(List<String> roles) {
    return (root, query, cb) -> {
      if (roles == null || roles.isEmpty()) {
        return cb.conjunction();
      }

      Join<Account, Role> rolesJoin = root.join("roles", JoinType.LEFT);
      return rolesJoin.get("name").in(roles);
    };
  }

  public static Specification<Account> isEnable(boolean enabled) {
    return (root, query, cb) ->
      cb.equal(root.get("enable"), enabled);
  }

  public static Specification<Account> createdBetween(Long fromDate, Long toDate) {
    return (root, query, criteriaBuilder) -> {
      if (fromDate == null || toDate == null) {
        return criteriaBuilder.conjunction();
      }

      return criteriaBuilder.between(
              root.get("createdAt"),
              new java.util.Date(fromDate),
              new java.util.Date(toDate)
      );
    };
  }
}
