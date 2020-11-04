package com.perscholas.case_study.sunshine_shop.service.impl;

import com.perscholas.case_study.sunshine_shop.dao.ProductRepository;
import com.perscholas.case_study.sunshine_shop.service.ProductService;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class ProductServiceImpl implements ProductService {
    private ProductRepository productRepository;

    @Override
    public void deleteProduct(long id) {
        productRepository.deleteById(id);
    }

}
