package com.perscholas.case_study.sunshine_shop.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "user")
@Data
public class User implements Serializable {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "user_email")
    private String userEmail;

    @Column(name = "user_password")
    private String userPassword;

    @Column(name = "user_first_name")
    private String userFirstName;

    @Column(name = "user_last_name")
    private String userLastName;

    @Column(name = "user_profile_image_url")
    private String user_profile_imageUrl;

    @Column(name = "user_last_login_date")
    private Date lastLoginDate;

    @Column(name = "user_last_login_date_display")
    private Date lastLoginDateDisplay;

    @Column(name = "user_join_date")
    private Date joinDate;

    @Column(name = "user_roles")
    private String[] roles;

    @Column(name = "user_authorities")
    private String[] authorities;

    @Column(name = "user_active")
    private boolean active;

    @Column(name = "user_is_non_locked")
    private boolean isNonLocked;

    public User() {
    }

    public User(Long id, String userEmail, String userPassword, String userFirstName, String userLastName, String user_profile_imageUrl, Date lastLoginDate, Date lastLoginDateDisplay, Date joinDate, String[] roles, String[] authorities, boolean active, boolean isNonLocked) {
        this.id = id;
        this.userEmail = userEmail;
        this.userPassword = userPassword;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.user_profile_imageUrl = user_profile_imageUrl;
        this.lastLoginDate = lastLoginDate;
        this.lastLoginDateDisplay = lastLoginDateDisplay;
        this.joinDate = joinDate;
        this.roles = roles;
        this.authorities = authorities;
        this.active = active;
        this.isNonLocked = isNonLocked;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public String getUserFirstName() {
        return userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public String getUserLastName() {
        return userLastName;
    }

    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }

    public String getUser_profile_imageUrl() {
        return user_profile_imageUrl;
    }

    public void setUser_profile_imageUrl(String user_profile_imageUrl) {
        this.user_profile_imageUrl = user_profile_imageUrl;
    }

    public Date getLastLoginDate() {
        return lastLoginDate;
    }

    public void setLastLoginDate(Date lastLoginDate) {
        this.lastLoginDate = lastLoginDate;
    }

    public Date getLastLoginDateDisplay() {
        return lastLoginDateDisplay;
    }

    public void setLastLoginDateDisplay(Date lastLoginDateDisplay) {
        this.lastLoginDateDisplay = lastLoginDateDisplay;
    }

    public Date getJoinDate() {
        return joinDate;
    }

    public void setJoinDate(Date joinDate) {
        this.joinDate = joinDate;
    }

    public String[] getRoles() {
        return roles;
    }

    public void setRoles(String[] roles) {
        this.roles = roles;
    }

    public String[] getAuthorities() {
        return authorities;
    }

    public void setAuthorities(String[] authorities) {
        this.authorities = authorities;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    public boolean isNonLocked() {
        return isNonLocked;
    }

    public void setNonLocked(boolean nonLocked) {
        isNonLocked = nonLocked;
    }
}