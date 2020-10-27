package com.perscholas.case_study.sunshine_shop.service.impl;

import com.perscholas.case_study.sunshine_shop.dao.UserRepository;
import com.perscholas.case_study.sunshine_shop.entity.User;
import com.perscholas.case_study.sunshine_shop.entity.UserPrincipal;
import com.perscholas.case_study.sunshine_shop.exception.EmailExistException;
import com.perscholas.case_study.sunshine_shop.exception.UserNameExistException;
import com.perscholas.case_study.sunshine_shop.exception.UserNotFoundException;
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

import javax.transaction.Transactional;
import java.util.Date;
import java.util.List;
import java.util.Random;

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

    @Autowired
    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findUserByUserEmail(email);
        if (user == null) {
            LOGGER.error("User not found by email:" + email);
            throw new UsernameNotFoundException("User not found by email:" + email);
        } else {
            user.setLastLoginDateDisplay((user.getLastLoginDate()));
            user.setLastLoginDate(new Date());
            userRepository.save(user);
            UserPrincipal userPrincipal = new UserPrincipal(user);
            LOGGER.info("find user by email" + email);
            return userPrincipal;
        }
    }

    @Override
    public User register(String firstName, String lastName, String username, String email) throws UserNotFoundException, UserNameExistException, EmailExistException {
        validateUsernameAndEmail(StringUtils.EMPTY, username, email);
        User user = new User();
        user.setId(generateUserId());
        String password = generatePassword();
        String encodedPassword = encodePassword(password);
        user.setUserFirstName(firstName);
        user.setUserLastName(lastName);
        user.setUsername(username);
        user.setUserEmail(email);
        user.setJoinDate(new Date());
        // want password in database encoded
        user.setUserPassword(encodedPassword);
        user.setActive(true);
        user.setNonLocked(true);
        user.setRole(ROLE_Cashier.name());
        user.setAuthorities(ROLE_Cashier.getAuthorities());
        user.setUser_profile_imageUrl(getTemperaryProfileImageUrl());
        userRepository.save(user);
        LOGGER.info("New user password: " + password);
        return null;
    }

    @Override
    public List<User> getUsers() {
        return null;
    }

    @Override
    public User findUserByUserEmail(String email) {
        return null;
    }

    @Override
    public User findUserByUserName(String name) {
        return null;
    }

    private String getTemperaryProfileImageUrl() {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path("/user/image/Profile/temp").toUriString();
    }

    private String encodePassword(String password) {
        return bCryptPasswordEncoder.encode(password);
    }

    private String generatePassword() {
        return RandomStringUtils.randomAlphabetic(10);
    }

    private Long generateUserId() {
        Random random = new Random();
        Long num = (long) random.nextInt(10000);
        return num;
    }

    private User validateUsernameAndEmail(String currentUsername, String newUsername, String newEmail) throws UserNotFoundException, UserNameExistException, EmailExistException {
        if (StringUtils.isNotBlank(currentUsername)) {
            User currentUser = findUserByUserName(currentUsername);
            if (currentUser == null) {
                throw new UserNotFoundException("No user found by username" + currentUsername);
            }
            User userByUsername = findUserByUserName(newUsername);
            if (userByUsername != null && !currentUser.getId().equals(userByUsername.getId())) {
                throw new UserNameExistException("User Name alrealdy exists");
            }

            User userByUserEmail = findUserByUserEmail(newEmail);
            if (userByUserEmail != null && !currentUser.getId().equals(userByUsername.getId())) {
                throw new EmailExistException("Email alrealdy exists");
            }
            return currentUser;
        } else {
            User userByUserName = findUserByUserName(newUsername);
            if (userByUserName != null) {
                throw new UserNameExistException("User Name alrealdy exists");
            }

            User userByUserEmail = findUserByUserEmail(newEmail);
            if (userByUserEmail != null) {
                throw new EmailExistException("Email alrealdy exists");
            }
            return null;
        }
    }


}
