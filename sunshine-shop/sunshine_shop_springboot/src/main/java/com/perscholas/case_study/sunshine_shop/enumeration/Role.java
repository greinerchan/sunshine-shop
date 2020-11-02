package com.perscholas.case_study.sunshine_shop.enumeration;

import static com.perscholas.case_study.sunshine_shop.constant.Authority.*;

public enum Role {
    ROLE_CUSTOMER(CUSTOMER_AUTHORITIES),
    ROLE_CASHIER(CASHIER_AUTHORITIES),
    ROLE_SHOP_MANAGER(SHOP_MANAGER_AUTHORITIES),
    ROLE_GENERAL_MANAGER(GENERAL_MANAGER_AUTHORITIES);

    private String[] authorities;

    Role(String...authorities) {
        this.authorities = authorities;
    }
    public String[] getAuthorities() {
        return authorities;
    }
}
