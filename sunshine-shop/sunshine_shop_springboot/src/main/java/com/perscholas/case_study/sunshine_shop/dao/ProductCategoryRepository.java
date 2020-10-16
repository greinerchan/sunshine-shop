package com.perscholas.case_study.sunshine_shop.dao;

import com.perscholas.case_study.sunshine_shop.entity.Product;
import com.perscholas.case_study.sunshine_shop.entity.ProductCategory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@CrossOrigin("http://localhost:4200")
@RepositoryRestResource(collectionResourceRel = "productCategory", path = "product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {
    Page<ProductCategory> findById(@RequestParam("id") Long id, Pageable pageable);

    @Query("From ProductCategory AS PC INNER JOIN PC.productSubCategories AS PSC " +
            "INNER JOIN PSC.products AS PD WHERE PD.id = ?1")
    List<Product> FindAllWithDescriptionQuery(Long id);

}



