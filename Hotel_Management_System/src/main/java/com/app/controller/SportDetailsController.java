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

import com.app.entities.SportDetails;
import com.app.service.SportDetailsImpl;

@RestController
@RequestMapping("/api/sportdetails")
@CrossOrigin(origins = "*")
public class SportDetailsController {

	@Autowired
	SportDetailsImpl sportDetailsImpl;

	@GetMapping
	public ResponseEntity<?> getAllSportDetails(){
		List<SportDetails>sportDetailsList= sportDetailsImpl.getAllSportDetails();
		return ResponseEntity.status(200).body(sportDetailsList);
	}
		
	@PostMapping
	public ResponseEntity<?> addSportDetails(@RequestBody SportDetails sportdetails ) {
		boolean status=sportDetailsImpl.addSportDetails(sportdetails);
		if(status) {
			return ResponseEntity.status(200).body("success");
		}
		else {
			return ResponseEntity.status(500).body("error");
		}
	}
}
