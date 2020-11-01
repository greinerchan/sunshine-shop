package com.perscholas.case_study.sunshine_shop.service;

import com.perscholas.case_study.sunshine_shop.entity.User;
import com.perscholas.case_study.sunshine_shop.exception.EmailExistException;
import com.perscholas.case_study.sunshine_shop.exception.EmailNotFoundException;
import com.perscholas.case_study.sunshine_shop.exception.UserNameExistException;
import com.perscholas.case_study.sunshine_shop.exception.UserNotFoundException;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.IOException;
import java.util.List;

public interface UserService {

    User register(String userFirstName, String userLastName, String username, String userEmail) throws UserNotFoundException, UserNameExistException, EmailExistException, MessagingException;
    List<User> getUsers();
    User  findUserByUserEmail(String email);
    User findUserByUserName(String name);
    User addNewUser(String firstName, String lastName, String username, String email, String role, boolean isNonLocked, boolean isActive, MultipartFile profileImage) throws UserNotFoundException, UserNameExistException, EmailExistException, IOException;
    User updateUser(String currentUsername, String newFirstName, String newLastName, String newUsername, String newEmail, String role, boolean isNonLocked, boolean isActive, MultipartFile profileImage) throws UserNotFoundException, UserNameExistException, EmailExistException, IOException;
    void deleteUser(long id);
    User forgetPassword(String email) throws MessagingException, EmailNotFoundException;
    void resetPassword(String email, String password) throws EmailNotFoundException, MessagingException;
    User updateProfileImage(String username, MultipartFile profileImage) throws UserNotFoundException, UserNameExistException, EmailExistException, IOException;
}
