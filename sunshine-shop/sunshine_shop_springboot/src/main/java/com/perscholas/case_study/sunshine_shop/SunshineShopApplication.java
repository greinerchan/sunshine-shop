package com.perscholas.case_study.sunshine_shop;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@SpringBootApplication
public class SunshineShopApplication {

    public static void main(String[] args) {
        SpringApplication.run(SunshineShopApplication.class, args);
    }

    // give the bean to SecurityConfiguration when the APP start
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
