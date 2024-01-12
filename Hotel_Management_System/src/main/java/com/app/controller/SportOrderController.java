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

import com.app.entities.Sport;
import com.app.entities.SportDetails;
import com.app.service.ISportService;
import com.app.service.SportOrderServiceImpl;

@RestController
@RequestMapping("/api/sportorderdetails")
@CrossOrigin(origins = "*")
public class SportOrderController {

	@Autowired
	SportOrderServiceImpl sportOrderService;
	@Autowired
	ISportService sportService;
	
	
	@PostMapping("/{sportDetail_id}/{receipt_id}")
	public ResponseEntity<?> saveSportOrderDetails(@RequestBody Sport sport,@PathVariable Integer sportDetail_id,@PathVariable Integer receipt_id){
		SportDetails mealDetails=sportService.getSportDetailsById(sportDetail_id);
		System.out.println(mealDetails);
		sport.setSportDetails(mealDetails);
		boolean status=sportOrderService.saveSportOrderDetails(sport,receipt_id);
		if(status) {
			return ResponseEntity.status(200).body("success");
		}else {
			return ResponseEntity.status(500).body("error");
		}	
		
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<?> GetSportOrderDetails(@PathVariable Integer id){
		Sport sport=sportOrderService.getSportDetails(id);
		if(sport!=null) {
			return ResponseEntity.status(200).body(sport);
		}else {
			return ResponseEntity.status(500).body("error");
		}
}
}
