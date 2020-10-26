package com.perscholas.case_study.sunshine_shop.constant;

public class Authority {
    public static final String[] Cashier_AUTHORITIES = { "user:read" };
    public static final String[] Shop_Manager_AUTHORITIES = { "user:read", "user:update", "user:create"};
    public static final String[] General_Manager_AUTHORITIES = { "user:read", "user:update", "user:create", "user:delete" };
}
