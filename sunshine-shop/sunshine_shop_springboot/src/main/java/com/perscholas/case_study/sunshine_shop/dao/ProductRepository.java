package com.perscholas.case_study.sunshine_shop.dao;

import com.perscholas.case_study.sunshine_shop.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface ProductRepository extends JpaRepository<Product, Long> {
    Page<Product> findByProductSubCategoryId(@RequestParam("id") Long id, Pageable pageable);

    Page<Product> findByProductNameContaining(@RequestParam("name") String name, Pageable pageable);

    @Query(value = "SELECT * from product inner join sub_category sc on product.sub_category_id = sc.id " +
            "inner join category c on c.id = sc.category_id where c.id =:id", nativeQuery = true)
    public List<Product> FindAllWithDescriptionQuery(@Param("id") Long id);


}


