package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.Meal;
import com.app.entities.MealDetails;
import com.app.service.IMealService;
import com.app.service.MealOrderServiceImpl;

@RestController
@RequestMapping("/api/mealorderdetails")
@CrossOrigin(origins = "*")
public class MealOrderController {

	@Autowired
	MealOrderServiceImpl mealOrderService;
	
	@Autowired
	IMealService mealService;
	
	@PostMapping("/{mealDetail_id}/{receipt_id}")
	public ResponseEntity<?> saveMealOrderDetails(@RequestBody Meal meal,@PathVariable Integer mealDetail_id,@PathVariable Integer receipt_id){
		MealDetails mealDetails=mealService.getMealDetailsById(mealDetail_id);
		System.out.println(mealDetails);
		meal.setMealDetails(mealDetails);
		boolean status=mealOrderService.saveMealOrderDetails(meal,receipt_id);
		if(status) {
			return ResponseEntity.status(200).body("success");
		}else {
			return ResponseEntity.status(500).body("error");
		}	
		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> GetMealOrderDetails(@PathVariable Integer id){
		Meal meal=mealOrderService.getMealDetails(id);
		if(meal!=null) {
			return ResponseEntity.status(200).body(meal);
		}else {
			return ResponseEntity.status(500).body("error");
		}
		
	}
}
