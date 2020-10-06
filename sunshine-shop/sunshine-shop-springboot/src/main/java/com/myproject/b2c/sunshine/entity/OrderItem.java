package com.myproject.b2c.sunshine.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="orderitem")
@Data
public class OrderItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "orderitem_id")
    private Long orderitem_id;

    @Column(name = "orderitem_code")
    private String orderitem_code;

    @Column(name = "orderitem_address")
    private String orderitem_address;

    @Column(name = "orderitem_detail_address")
    private String orderitem_detail_address;

    @Column(name = "orderitem_post")
    private String orderitem_post;

    @Column(name = "orderitem_receiver")
    private String orderitem_receiver;

    @Column(name = "orderitem_mobile")
    private String orderitem_mobile;

    @Column(name = "orderitem_pay_date")
    @CreationTimestamp
    private Date orderitem_pay_date;

    @Column(name = "orderitem_delivery_date")
    @UpdateTimestamp
    private Date orderitem_delivery_date;

    @Column(name = "orderitem_confirm_date")
    @CreationTimestamp
    private Date orderitem_confirm_date;

    @Column(name = "orderitem_status")
    private int orderitem_status;

    @Column(name = "orderitem_user_id")
    private Long orderitem_user_id;
}
