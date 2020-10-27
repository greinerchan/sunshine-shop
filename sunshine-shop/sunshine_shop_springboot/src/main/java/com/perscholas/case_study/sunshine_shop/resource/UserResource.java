package com.perscholas.case_study.sunshine_shop.resource;

import com.perscholas.case_study.sunshine_shop.entity.User;
import com.perscholas.case_study.sunshine_shop.entity.UserPrincipal;
import com.perscholas.case_study.sunshine_shop.exception.EmailExistException;
import com.perscholas.case_study.sunshine_shop.exception.ExceptionHandling;
import com.perscholas.case_study.sunshine_shop.exception.UserNameExistException;
import com.perscholas.case_study.sunshine_shop.exception.UserNotFoundException;
import com.perscholas.case_study.sunshine_shop.service.UserService;
import com.perscholas.case_study.sunshine_shop.utility.JWTTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import static com.perscholas.case_study.sunshine_shop.constant.SecurityConstant.JWT_TOKEN_HEADER;

@RestController
@RequestMapping(path = {"/", "/user"})
public class UserResource extends ExceptionHandling {

    private UserService userService;
    private AuthenticationManager authenticationManager;
    private JWTTokenProvider jwtTokenProvider;

    @Autowired
    public UserResource(UserService userService, AuthenticationManager authenticationManager, JWTTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @PostMapping("/login")
    public ResponseEntity<User> login(@RequestBody User user) throws UserNotFoundException, UserNameExistException, EmailExistException {
        authenticate(user.getUserEmail(), user.getUserPassword());
        User loginUser = userService.findUserByUserEmail(user.getUserEmail());
        UserPrincipal userPrincipal = new UserPrincipal(loginUser);
        HttpHeaders jwtHeader = getJwtHeader(userPrincipal);
        return new ResponseEntity<>(loginUser, jwtHeader ,HttpStatus.OK);
    }


    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) throws UserNotFoundException, UserNameExistException, EmailExistException {
        //return "application works";
        User newUser = userService.register(user.getUserFirstName(), user.getUserLastName(), user.getUsername(), user.getUserEmail());
        return new ResponseEntity<>(newUser, HttpStatus.OK);
    }

    private HttpHeaders getJwtHeader(UserPrincipal userPrincipal) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(JWT_TOKEN_HEADER, jwtTokenProvider.generateJWTToken(userPrincipal));
        return headers;
    }

    private void authenticate(String userEmail, String userPassword) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userEmail, userPassword));

    }
}
