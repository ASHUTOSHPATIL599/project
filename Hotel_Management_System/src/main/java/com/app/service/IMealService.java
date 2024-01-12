package com.app.service;

import java.util.List;

import com.app.entities.MealDetails;

public interface IMealService {

	List<MealDetails>  getAllMealDetails();
	boolean addMealDetails(MealDetails mealDetails);
	MealDetails getMealDetailsById(Integer id);
}
