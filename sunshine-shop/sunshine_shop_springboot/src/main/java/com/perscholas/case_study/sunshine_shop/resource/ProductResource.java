package com.perscholas.case_study.sunshine_shop.resource;


import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = {"/sunshine"})
public class ProductResource {

    @DeleteMapping("/delete/{Id}")
    public void deleteProduct(@PathVariable int Id) {

    }
}
