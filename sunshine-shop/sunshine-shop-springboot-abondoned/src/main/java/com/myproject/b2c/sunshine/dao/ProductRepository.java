package com.myproject.b2c.sunshine.dao;

import com.myproject.b2c.sunshine.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ProductRepository extends JpaRepository<Product, Long> {
}
