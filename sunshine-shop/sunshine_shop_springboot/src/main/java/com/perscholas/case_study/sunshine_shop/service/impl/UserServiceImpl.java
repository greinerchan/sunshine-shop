package com.perscholas.case_study.sunshine_shop.service.impl;

import com.perscholas.case_study.sunshine_shop.dao.UserRepository;
import com.perscholas.case_study.sunshine_shop.entity.User;
import com.perscholas.case_study.sunshine_shop.entity.UserPrincipal;
import com.perscholas.case_study.sunshine_shop.exception.EmailExistException;
import com.perscholas.case_study.sunshine_shop.exception.UserNameExistException;
import com.perscholas.case_study.sunshine_shop.exception.UserNotFoundException;
import com.perscholas.case_study.sunshine_shop.service.EmailService;
import com.perscholas.case_study.sunshine_shop.service.LoginAttemptService;
import com.perscholas.case_study.sunshine_shop.service.UserService;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;

import static com.perscholas.case_study.sunshine_shop.constant.UserImplConstant.*;
import static com.perscholas.case_study.sunshine_shop.enumeration.Role.ROLE_Cashier;

@Service
@Transactional
//Qualifier is name of the bean
@Qualifier("UserDetailsService")
public class UserServiceImpl implements UserService, UserDetailsService {

    // getClass() = UserServiceImpl.class, here
    private Logger LOGGER = LoggerFactory.getLogger(getClass());
    private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private LoginAttemptService loginAttemptService;
    private EmailService emailService;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder,
                           LoginAttemptService loginAttemptService, EmailService emailService) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = passwordEncoder;
        this.loginAttemptService = loginAttemptService;
        this.emailService = emailService;
    }

    // check if the user email is already in the system
    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findUserByUserEmail(email);
        if (user == null) {
            LOGGER.error(USER_NOT_FOUND_BY_EMAIL + email);
            throw new UsernameNotFoundException(USER_NOT_FOUND_BY_EMAIL + email);
        } else {
            validateLoginAttempt(user);
            user.setLastLoginDateDisplay((user.getLastLoginDate()));
            user.setLastLoginDate(new Date());
            userRepository.save(user);
            UserPrincipal userPrincipal = new UserPrincipal(user);
            LOGGER.info(FIND_USER_BY_EMAIL + email);
            return userPrincipal;
        }
    }

    private void validateLoginAttempt(User user) {
        if (user.isNonLocked()) {
            if(loginAttemptService.hasExceededMaxAttempts(user.getUserEmail())) {
                user.setNonLocked(false);
            } else {
                user.setNonLocked(true);
            }

        } else {
            loginAttemptService.evictUserFromLoginAttemptCache(user.getUsername());
        }
    }

    @Override
    public User register(String userLastName, String userFirstName, String username, String userEmail) throws UserNotFoundException, UserNameExistException, EmailExistException, MessagingException {
        validateUsernameAndEmail(StringUtils.EMPTY, username, userEmail);
        User user = new User();
        String password = generatePassword();
        String encodedPassword = encodePassword(password);
        user.setUserFirstName(userFirstName);
        user.setUserLastName(userLastName);
        user.setUsername(username);
        user.setUserEmail(userEmail);
        user.setJoinDate(new Date());
        // want password in database encoded
        user.setUserPassword(encodedPassword);
        user.setActive(true);
        user.setNonLocked(true);
        user.setRole(ROLE_Cashier.name());
        user.setAuthorities(ROLE_Cashier.getAuthorities());
        user.setUser_profile_imageUrl(getTemperaryProfileImageUrl());
        userRepository.save(user);
        emailService.sendNewPasswordEmail(userFirstName, password, userEmail);
        return user;
    }

    @Override
    public List<User> getUsers() {
        return userRepository.findAll();
    }

    @Override
    public User findUserByUserEmail(String email) {
        return userRepository.findUserByUserEmail(email);
    }

    @Override
    public User findUserByUserName(String name) {
        return userRepository.findUserByUsername(name);
    }

    private String getTemperaryProfileImageUrl() {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path(DEFAULT_USER_IMAGE_PATH).toUriString();
    }

    private String encodePassword(String password) {
        return bCryptPasswordEncoder.encode(password);
    }

    private String generatePassword() {
        return RandomStringUtils.randomAlphabetic(10);
    }

    private User validateUsernameAndEmail(String currentUsername, String newUsername, String newEmail) throws UserNotFoundException, UserNameExistException, EmailExistException {
        User userByNewUsername = findUserByUserName(newUsername);
        User userByNewUserEmail = findUserByUserEmail(newEmail);

        if (StringUtils.isNotBlank(currentUsername)) {
            User currentUser = findUserByUserName(currentUsername);
            if (currentUser == null) {
                throw new UserNotFoundException(NO_USER_FOUND_BY_USERNAME + currentUsername);
            }
            if (userByNewUsername != null && !currentUser.getId().equals(userByNewUsername.getId())) {
                throw new UserNameExistException(USERNAME_ALREALDY_EXISTS);
            }

            if (userByNewUserEmail != null && !currentUser.getId().equals(userByNewUsername.getId())) {
                throw new EmailExistException(EMAIL_ALREALDY_EXISTS);
            }
            return currentUser;
        } else {
            if (userByNewUsername != null) {
                throw new UserNameExistException(USERNAME_ALREALDY_EXISTS);
            }
            if (userByNewUserEmail != null) {
                throw new EmailExistException(EMAIL_ALREALDY_EXISTS);
            }
            return null;
        }
    }


}
