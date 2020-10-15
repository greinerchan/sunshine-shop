package com.perscholas.case_study.sunshine_shop.config;

import com.perscholas.case_study.sunshine_shop.entity.Product;
import com.perscholas.case_study.sunshine_shop.entity.ProductCategory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;

import javax.persistence.EntityManager;
import javax.persistence.metamodel.EntityType;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    private EntityManager entityManager;

    @Autowired
    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {


        HttpMethod[] disableActions = {HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.POST};

        config.getExposureConfiguration().forDomainType(Product.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(disableActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(disableActions));

        config.getExposureConfiguration().forDomainType(ProductCategory.class)
                .withItemExposure((metdata, httpMethods) -> httpMethods.disable(disableActions))
                .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(disableActions));

        exposeId(config);
    }

    private void exposeId(RepositoryRestConfiguration config) {

        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();
        List<Class> entityClasses = new ArrayList<>();

        for (EntityType entity : entities) {
            entityClasses.add(entity.getJavaType());
        }

        Class[] domainType = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainType);
    }
}
