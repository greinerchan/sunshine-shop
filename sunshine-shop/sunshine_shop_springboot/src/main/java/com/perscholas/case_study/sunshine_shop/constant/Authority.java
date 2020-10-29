package com.perscholas.case_study.sunshine_shop.constant;

public class Authority {
    public static final String[] CASHIER_AUTHORITIES = { "user:read" };
    public static final String[] SHOP_MANAGER_AUTHORITIES = { "user:read", "user:update", "user:create"};
    public static final String[] GENERAL_MANAGER_AUTHORITIES = { "user:read", "user:update", "user:create", "user:delete" };
}
