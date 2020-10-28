package com.perscholas.case_study.sunshine_shop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.File;

import static com.perscholas.case_study.sunshine_shop.constant.FileConstant.USER_FOLDER;

@SpringBootApplication
public class SunshineShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(SunshineShopApplication.class, args);
        new File(USER_FOLDER).mkdirs();
    }

    // give the bean to SecurityConfiguration when the APP start
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
