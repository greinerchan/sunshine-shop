package com.perscholas.case_study.sunshine_shop.dao;

import com.perscholas.case_study.sunshine_shop.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findUserByUserLastName(String lastName);
    User findUserByUserEmail(String email);
}
