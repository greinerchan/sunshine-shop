package com.perscholas.case_study.sunshine_shop.listener;

import com.perscholas.case_study.sunshine_shop.service.LoginAttemptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.security.authentication.event.AuthenticationFailureBadCredentialsEvent;
import org.springframework.stereotype.Component;

@Component
public class AuthenticationFailureListener {
    private LoginAttemptService loginAttemptService;

    @Autowired // wire loginAttemptService bean to this class so we can use it
    public AuthenticationFailureListener(LoginAttemptService loginAttemptService) {
        this.loginAttemptService = loginAttemptService;
    }

    @EventListener
    public void onAuthenticationFailure(AuthenticationFailureBadCredentialsEvent event) {
        Object principal = event.getAuthentication().getPrincipal();
        if (principal instanceof  String) {
            String userEmail = (String) event.getAuthentication().getPrincipal();
            loginAttemptService.addUserToLoginAttemptCache(userEmail);
        }
    }
}
