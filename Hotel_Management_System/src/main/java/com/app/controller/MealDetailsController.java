package com.app.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.entities.MealDetails;
import com.app.service.MealDetailsImpl;

@RestController
@RequestMapping("/api/mealdetails")
@CrossOrigin(origins = "*")
public class MealDetailsController {

	@Autowired
	MealDetailsImpl mealDetailsImpl;
	
	@GetMapping
	public ResponseEntity<?> getAllMealDetails(){
		List<MealDetails> mealList=mealDetailsImpl.getAllMealDetails();
		return ResponseEntity.status(200).body(mealList);
	}
	
	@PostMapping
	public ResponseEntity<?> addMealDetails(@RequestBody MealDetails mealDetails) {
		boolean status=mealDetailsImpl.addMealDetails(mealDetails);
		if(status) {
			return ResponseEntity.status(200).body("success");
		}else {
			return ResponseEntity.status(500).body("error");
		}
	}
}
