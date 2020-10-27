package com.perscholas.case_study.sunshine_shop.enumeration;

import static com.perscholas.case_study.sunshine_shop.constant.Authority.*;

public enum Role {
    ROLE_Cashier(Cashier_AUTHORITIES),
    ROLE_Shop_Manager(Shop_Manager_AUTHORITIES),
    ROLE_USER_General_Manager(General_Manager_AUTHORITIES);

    private String[] authorities;

    Role(String...authorities) {
        this.authorities = authorities;
    }
    public String[] getAuthorities() {
        return authorities;
    }
}
