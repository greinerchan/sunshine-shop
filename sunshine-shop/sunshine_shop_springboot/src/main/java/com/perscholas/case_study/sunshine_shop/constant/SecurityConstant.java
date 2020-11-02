package com.perscholas.case_study.sunshine_shop.constant;

public class SecurityConstant {
    public static final long EXPIRATION_TIME = 432_000_000; // 5 days in milliseonds
    public static final String TOKEN_PREFIX = "Bearer"; //if the token correct, don't care other
    public static final String JWT_TOKEN_HEADER = "Jwt-Token";
    public static final String TOKEN_CANNOT_BE_VERIFIED = "Token cannot be verifiend";
    public static final String GET_SUNSHINE_SHOP = "SUNSHINE SHOP";
    public static final String GET_SUNSHINE_SHOP_ADMINISTRATION = "Online Shopping Mall";
    public static final String AUTHORITIES = "Authorities";
    public static final String FORBIDDEN_MESSAGE = "You need to login in";
    public static final String ACCESS_DENIED_MESSAGE = "You have no permission to access";
    public static final String OPTIONS_HTTP_METHOD = "OPTIONS";
    public static final String[] PUBLIC_URLS = {"/sunshine/**","/admin/login", "/admin/register", "/admin/forgetpassword/**","/admin/resetpassword/**", "/admin/image/**"};
    //public static final String[] PUBLIC_URLS = {"**"};
}
