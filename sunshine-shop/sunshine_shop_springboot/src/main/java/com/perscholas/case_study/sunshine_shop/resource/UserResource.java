package com.perscholas.case_study.sunshine_shop.resource;

import com.perscholas.case_study.sunshine_shop.entity.HttpResponse;
import com.perscholas.case_study.sunshine_shop.entity.User;
import com.perscholas.case_study.sunshine_shop.entity.UserPrincipal;
import com.perscholas.case_study.sunshine_shop.exception.*;
import com.perscholas.case_study.sunshine_shop.service.UserService;
import com.perscholas.case_study.sunshine_shop.utility.JWTTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.mail.MessagingException;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;

import static com.perscholas.case_study.sunshine_shop.constant.FileConstant.*;
import static com.perscholas.case_study.sunshine_shop.constant.SecurityConstant.JWT_TOKEN_HEADER;
import static org.springframework.http.HttpStatus.OK;
import static org.springframework.http.MediaType.IMAGE_JPEG_VALUE;

@RestController
@RequestMapping(path = {"/", "/admin"})
public class UserResource extends ExceptionHandling {

    public static final String Email_Sent = "An email with new password was sent to: ";
    public static final String USER_DELETED_SUCCESSFULLY = "User deleted successfully";
    private UserService userService;
    private AuthenticationManager authenticationManager;
    private JWTTokenProvider jwtTokenProvider;

    @Autowired
    public UserResource(UserService userService, AuthenticationManager authenticationManager, JWTTokenProvider jwtTokenProvider) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @PostMapping("/admin/login")
    public ResponseEntity<User> login(@RequestBody User user) throws UserNotFoundException, UserNameExistException, EmailExistException {
        authenticate(user.getUserEmail(), user.getUserPassword());
        User loginUser = userService.findUserByUserEmail(user.getUserEmail());
        UserPrincipal userPrincipal = new UserPrincipal(loginUser);
        HttpHeaders jwtHeader = getJwtHeader(userPrincipal);
        return new ResponseEntity<>(loginUser, jwtHeader , OK);
    }

    @GetMapping("/admin/find/{username}")
    public ResponseEntity<User> getUser(@PathVariable("username") String username) {
        User user = userService.findUserByUserName(username);
        return new ResponseEntity<>(user, OK);
    }

    @PostMapping("/admin/register")
    public ResponseEntity<User> register(@RequestBody User user) throws UserNotFoundException, UserNameExistException, EmailExistException, MessagingException {
        //return "application works";
        User newUser = userService.register(user.getUserFirstName(), user.getUserLastName(), user.getUsername(), user.getUserEmail());
        return new ResponseEntity<>(newUser, OK);
    }

    @GetMapping("/admin/forgetpassword/{userEmail}")
    public ResponseEntity<HttpResponse> forgot(@PathVariable("userEmail") String email) throws UserNotFoundException, UserNameExistException, EmailExistException, MessagingException, EmailNotFoundException {
        userService.forgetPassword(email);
        // responseentity is everything you need to send request back, status and body
        return response(OK, Email_Sent + email);
    }


    @PostMapping("/admin/add")
    public ResponseEntity<User> addNewUser(@RequestParam("firstName") String firstName,
                                           @RequestParam("lastName") String lastName,
                                           @RequestParam("username") String username,
                                           @RequestParam("email") String email,
                                           @RequestParam("role") String role,
                                           @RequestParam("isActive") String isActive,
                                           @RequestParam("isNonLocked") String isNonLocked,
                                           // not required
                                           @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) throws UserNotFoundException, EmailExistException, IOException, UserNameExistException {
        User newUser = userService.addNewUser(firstName, lastName, username, email ,role,
                Boolean.parseBoolean(isNonLocked), Boolean.parseBoolean(isActive));
        return new ResponseEntity<>(newUser, OK);
    }

    @PostMapping("/admin/update")
    public ResponseEntity<User> update(    @RequestParam("currentUsername") String currentUsername,
                                           @RequestParam("userFirstName") String firstName,
                                           @RequestParam("userLastName") String lastName,
                                           @RequestParam("username") String username,
                                           @RequestParam("userEmail") String email,
                                           @RequestParam("role") String role,
                                           @RequestParam("active") String isActive,
                                           @RequestParam("isNonLocked") String isNonLocked,
                                           // not required
                                           @RequestParam(value = "profileImage", required = false) MultipartFile profileImage) throws UserNotFoundException, EmailExistException, IOException, UserNameExistException {
        User updatedUser = userService.updateUser(currentUsername, firstName, lastName, username, email ,role,
                Boolean.parseBoolean(isNonLocked), Boolean.parseBoolean(isActive));
        // responseentity is everything you need to send request back, status and body
        return new ResponseEntity<>(updatedUser, OK);
    }

    @GetMapping("/admin/list")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getUsers();
        return new ResponseEntity<>(users, OK);
    }

    @PostMapping("/admin/resetPassword")
    private ResponseEntity<HttpResponse> resetPassword(@RequestParam("email") String email, @RequestParam("password") String password) throws EmailNotFoundException, MessagingException {
        userService.resetPassword(email, password);
        return response(OK, Email_Sent + email);
    }


    @DeleteMapping("/admin/delete/{id}")
    //@EnableGlobalMethodSecurity(prePostEnabled = true)  make it happen, can add security in method level
    @PreAuthorize("hasAnyAuthority('user:delete')")
    public ResponseEntity<HttpResponse> deleteUser(@PathVariable("id") long id) {
        userService.deleteUser(id);
        return response(OK, USER_DELETED_SUCCESSFULLY);
    }
    private ResponseEntity<HttpResponse> response(HttpStatus httpStatus, String message) {
        return new ResponseEntity<>(new HttpResponse(httpStatus.value(), httpStatus, httpStatus.getReasonPhrase().toUpperCase(),
                message.toUpperCase()), httpStatus);
    }

    private HttpHeaders getJwtHeader(UserPrincipal userPrincipal) {
        HttpHeaders headers = new HttpHeaders();
        headers.add(JWT_TOKEN_HEADER, jwtTokenProvider.generateJWTToken(userPrincipal));
        return headers;
    }

    private void authenticate(String userEmail, String userPassword) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userEmail, userPassword));

    }

    @PostMapping("/admin/updateProfileImage")
    public ResponseEntity<User> updateProfileImage(
                                           @RequestParam("username") String username,
                                           // not required
                                           @RequestParam(value = "profileImage") MultipartFile profileImage) throws UserNotFoundException, EmailExistException, IOException, UserNameExistException {
        User user = userService.updateProfileImage(username, profileImage);
        // responseentity is everything you need to send request back, status and body
        return new ResponseEntity<>(user, OK);
    }

    @GetMapping(path = "/image/{username}/{fileName}", produces = IMAGE_JPEG_VALUE)
    public byte[] getProfileImage(@PathVariable("username") String username, @PathVariable("fileName") long fileName) throws IOException {
        return Files.readAllBytes(Paths.get(USER_FOLDER + username + FORWARD_SLASH + fileName));
    }                             // user.home   + "/supporatal/user/rick/rick.jpg"



    @GetMapping(path = "/image/profile/{username}", produces = IMAGE_JPEG_VALUE)
    public byte[] getTempProfileImage(@PathVariable("username") String username) throws IOException {
        URL url = new URL(TEMP_PROFILE_IMAGE_BASE_URL + username);
        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
        try (InputStream inputStream = url.openStream()) {
            int bytesRead;
            // each time read 1024 bytes
            byte[] chunk = new byte[1024];
            // read util no more
            while((bytesRead = inputStream.read(chunk)) > 0) {
                byteArrayOutputStream.write(chunk, 0, bytesRead);
            }
        }
        return byteArrayOutputStream.toByteArray();
    }
}
