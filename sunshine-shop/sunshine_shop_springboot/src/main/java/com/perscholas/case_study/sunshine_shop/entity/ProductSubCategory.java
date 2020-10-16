package com.perscholas.case_study.sunshine_shop.entity;

import lombok.Data;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name="sub_category")
//@Getter
//@Setter
@Data
public class ProductSubCategory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "sub_category_name")
    private String sub_category_name;


    @ManyToOne(cascade=CascadeType.ALL)
    @JoinColumn(name = "category_id", nullable = false)
    private ProductCategory productCategory;

    @OneToMany(mappedBy = "productSubCategory",
               cascade= {CascadeType.PERSIST, CascadeType.MERGE,
                    CascadeType.DETACH, CascadeType.REFRESH})
    private Set<Product> products;

}