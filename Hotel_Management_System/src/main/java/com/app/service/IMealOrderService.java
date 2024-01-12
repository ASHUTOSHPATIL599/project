package com.app.service;


import com.app.entities.Meal;
import com.app.entities.MealDetails;


public interface IMealOrderService {

	boolean saveMealOrderDetails(Meal meal,Integer recieptId);
	Meal getMealDetails(Integer id);
	
}
