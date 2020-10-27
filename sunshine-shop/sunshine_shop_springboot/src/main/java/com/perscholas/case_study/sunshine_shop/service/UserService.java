package com.perscholas.case_study.sunshine_shop.service;

import com.perscholas.case_study.sunshine_shop.entity.User;
import com.perscholas.case_study.sunshine_shop.exception.EmailExistException;
import com.perscholas.case_study.sunshine_shop.exception.UserNameExistException;
import com.perscholas.case_study.sunshine_shop.exception.UserNotFoundException;

import java.util.List;

public interface UserService {

    User register(String userFirstName, String userLastName, String username, String userEmail) throws UserNotFoundException, UserNameExistException, EmailExistException;

    List<User> getUsers();

    User  findUserByUserEmail(String email);
    User findUserByUserName(String name);
}
