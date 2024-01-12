package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.dao.MealRepository;
import com.app.entities.MealDetails;

@Service
@Transactional
public class MealDetailsImpl implements IMealService {

	@Autowired
	MealRepository mealRepository;
	
	@Override
	public List<MealDetails> getAllMealDetails() {
		List<MealDetails>mealDetailsList= mealRepository.findAll();
		return mealDetailsList;
	}

	@Override
	public boolean addMealDetails(MealDetails mealDetails) {
		MealDetails mDetails=mealRepository.save(mealDetails);
		return mDetails==null?false:true;
	}

	@Override
	public MealDetails getMealDetailsById(Integer id) {
		MealDetails mealDetails=mealRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("no Details Found"));
	    return mealDetails;
	}

}
