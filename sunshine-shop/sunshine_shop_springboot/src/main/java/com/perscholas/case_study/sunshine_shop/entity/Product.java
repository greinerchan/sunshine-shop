package com.perscholas.case_study.sunshine_shop.entity;

import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Entity
@Table(name="product")
@Data
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @ManyToOne(cascade= {CascadeType.PERSIST, CascadeType.MERGE,
            CascadeType.DETACH, CascadeType.REFRESH})
    @JoinColumn(name = "sub_category_id", nullable = false)
    private ProductSubCategory productSubCategory;

    @Column(name = "product_name")
    private String product_name;

    @Column(name = "product_title")
    private String product_title;

    @Column(name = "product_price")
    private BigDecimal product_price;

    @Column(name = "product_create_date")
    @CreationTimestamp
    private Date product_create_date;

    @Column(name = "product_last_updated")
    @UpdateTimestamp
    private Date product_last_updated;

    @Column(name = "product_image_url")
    private String product_image_url;

    @Column(name = "product_active")
    private boolean product_active;
}
