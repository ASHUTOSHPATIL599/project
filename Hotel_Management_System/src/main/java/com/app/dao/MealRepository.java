package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.entities.MealDetails;

public interface MealRepository extends JpaRepository<MealDetails, Integer> {

}
