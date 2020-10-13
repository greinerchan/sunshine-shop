package com.myproject.b2c.sunshine.dao;

import com.myproject.b2c.sunshine.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;


@RepositoryRestResource(collectionResourceRel = "category", path = "category")
public interface ProductCategoryRepository extends JpaRepository<Category, Long> {
}
