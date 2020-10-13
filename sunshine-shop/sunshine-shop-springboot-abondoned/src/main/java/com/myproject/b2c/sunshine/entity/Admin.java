package com.myproject.b2c.sunshine.entity;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="admin")
@Data
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "admin_id")
    private Integer admin_id;

    @Column(name = "admin_name")
    private String admin_name;

    @Column(name = "admin_nickname")
    private String admin_nickname;

    @Column(name = "admin_password")
    private String admin_password;

    @Column(name = "admin_profile_picture_src")
    private String admin_profile_picture_src;

}
