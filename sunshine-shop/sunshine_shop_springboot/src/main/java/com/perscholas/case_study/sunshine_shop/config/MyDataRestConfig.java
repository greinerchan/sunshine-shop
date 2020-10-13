package com.perscholas.case_study.sunshine_shop.config;

import com.perscholas.case_study.sunshine_shop.entity.Product;
import com.perscholas.case_study.sunshine_shop.entity.ProductCategory;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {
    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {

        HttpMethod[] disableActions = {HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST};

        config.getExposureConfiguration().forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(disableActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(disableActions));

        config.getExposureConfiguration().forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(disableActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(disableActions));
    }
}
