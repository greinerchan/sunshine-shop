package com.perscholas.case_study.sunshine_shop.dao;

import com.perscholas.case_study.sunshine_shop.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin("http://localhost:4200")
public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByUsername(String username);
    User findUserByUserEmail(String email);
    Page<User> findAll(Pageable pageable);
}
