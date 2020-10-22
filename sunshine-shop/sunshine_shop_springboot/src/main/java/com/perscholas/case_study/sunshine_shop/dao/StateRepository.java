package com.perscholas.case_study.sunshine_shop.dao;

import com.perscholas.case_study.sunshine_shop.entity.State;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;

@CrossOrigin("http://localhost:4200")
public interface StateRepository extends JpaRepository<State, Integer> {
    List<State> findByCountryName(@Param("name") String name);

}
