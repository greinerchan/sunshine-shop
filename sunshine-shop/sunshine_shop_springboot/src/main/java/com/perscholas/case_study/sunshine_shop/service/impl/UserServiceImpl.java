package com.perscholas.case_study.sunshine_shop.service.impl;

import com.perscholas.case_study.sunshine_shop.dao.UserRepository;
import com.perscholas.case_study.sunshine_shop.entity.User;
import com.perscholas.case_study.sunshine_shop.entity.UserPrincipal;
import com.perscholas.case_study.sunshine_shop.enumeration.Role;
import com.perscholas.case_study.sunshine_shop.exception.EmailExistException;
import com.perscholas.case_study.sunshine_shop.exception.EmailNotFoundException;
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
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.mail.MessagingException;
import javax.transaction.Transactional;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Date;
import java.util.List;

import static com.perscholas.case_study.sunshine_shop.constant.FileConstant.*;
import static com.perscholas.case_study.sunshine_shop.constant.UserImplConstant.*;
import static com.perscholas.case_study.sunshine_shop.enumeration.Role.ROLE_CUSTOMER;
import static java.nio.file.StandardCopyOption.REPLACE_EXISTING;
import static org.apache.logging.log4j.util.Strings.EMPTY;

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
    public User register(String userFirstName, String userLastName, String username, String userEmail) throws UserNotFoundException, UserNameExistException, EmailExistException, MessagingException {
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
        user.setRole(ROLE_CUSTOMER.name());
        user.setAuthorities(ROLE_CUSTOMER.getAuthorities());
        user.setUserProfileImageUrl(getTemperaryProfileImageUrl(username));
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
    public User findUserByUserName(String username) {
        return userRepository.findUserByUsername(username);
    }

    @Override
    public User addNewUser(String firstName, String lastName, String username, String email, String role, boolean isNonLocked, boolean isActive, MultipartFile profileImage) throws UserNotFoundException, UserNameExistException, EmailExistException, IOException {
        validateUsernameAndEmail(EMPTY, username, email);
        User user = new User();
        String password = generatePassword();
        String encodedPassword = encodePassword(password);
        user.setUserFirstName(firstName);
        user.setUserLastName(lastName);
        user.setJoinDate(new Date());
        user.setUsername(username);
        user.setUserEmail(email);
        user.setUserPassword(encodedPassword);
        user.setActive(isActive);
        user.setNonLocked(isNonLocked);
        user.setRole(getRoleEnumName(role).name());
        user.setAuthorities(getRoleEnumName(role).getAuthorities());
        user.setUserProfileImageUrl(getTemperaryProfileImageUrl(username));
        userRepository.save(user);
        saveProfileImage(user, profileImage);
        return user;
    }

    private void saveProfileImage(User user, MultipartFile profileImage) throws IOException {
        if (profileImage != null) {  // user/home /supportportal/user/ rick
            Path userFolder = Paths.get(USER_FOLDER + user.getUsername()).toAbsolutePath().normalize();
            if (Files.exists(userFolder)) {
                Files.createDirectories(userFolder);
                LOGGER.info(DIRECTORY_CREATED + userFolder);
            }
            Files.deleteIfExists(Paths.get(userFolder + user.getUsername() + DOT + JPG_EXTENSION));
            Files.copy(profileImage.getInputStream(), userFolder.resolve(user.getUsername() + DOT + JPG_EXTENSION), REPLACE_EXISTING);
            user.setUserProfileImageUrl(setUserProfileImageUrl(user.getUsername()));
            userRepository.save(user);
            LOGGER.info(FILE_SAVED_IN_FILE_SYSTEM + profileImage.getOriginalFilename());
        }
    }

    private String setUserProfileImageUrl(String username) {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path(USER_IMAGE_PATH + username + FORWARD_SLASH
        + username + DOT +JPG_EXTENSION).toUriString();
    }

    private Role getRoleEnumName(String role) {
        return Role.valueOf(role.toUpperCase());
    }

    @Override
    public User updateUser(String currentUsername, String newFirstName, String newLastName, String newUsername, String newEmail, String role, boolean isNonLocked, boolean isActive, MultipartFile profileImage) throws UserNotFoundException, UserNameExistException, EmailExistException, IOException {
        User currentUser = validateUsernameAndEmail(currentUsername, newUsername, newEmail);
        System.out.println("current user is" + currentUser.getUsername());
        currentUser.setUserFirstName(newFirstName);
        currentUser.setUserLastName(newLastName);
        currentUser.setUsername(newUsername);
        currentUser.setUserEmail(newEmail);
        currentUser.setActive(isActive);
        currentUser.setNonLocked(isNonLocked);
        currentUser.setRole(getRoleEnumName(role).name());
        currentUser.setAuthorities(getRoleEnumName(role).getAuthorities());
        userRepository.save(currentUser);
        saveProfileImage(currentUser, profileImage);
        return currentUser;
    }

    @Override
    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }

    @Override
    public void resetPassword(String email, String password) throws MessagingException, EmailNotFoundException {
        User user = userRepository.findUserByUserEmail(email);
        if (user == null) {
            throw new EmailNotFoundException(NO_USER_FOUND_BY_EMAIL + email);
        }
        user.setUserPassword(encodePassword(password));
        userRepository.save(user);
        emailService.sendNewPasswordEmail(user.getUserFirstName(), password, user.getUserEmail());
    }

    @Override
    public User forgetPassword(String email) throws MessagingException, EmailNotFoundException {
        User user = userRepository.findUserByUserEmail(email);
        if (user == null) {
            throw new EmailNotFoundException(NO_USER_FOUND_BY_EMAIL + email);
        }
        String password = generatePassword();
        user.setUserPassword(encodePassword(password));
        userRepository.save(user);
        emailService.sendNewPasswordEmail(user.getUserFirstName(), password, user.getUserEmail());
        return user;
    }

    @Override
    public User updateProfileImage(String username, MultipartFile profileImage) throws UserNotFoundException, UserNameExistException, EmailExistException, IOException {
        User user = validateUsernameAndEmail(username, null, null);
        saveProfileImage(user, profileImage);
        return user;
    }

    private String getTemperaryProfileImageUrl(String username) {
        return ServletUriComponentsBuilder.fromCurrentContextPath().path(DEFAULT_USER_IMAGE_PATH + username).toUriString();
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

            if (userByNewUserEmail != null && !currentUser.getId().equals(userByNewUserEmail.getId())) {
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
