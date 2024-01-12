package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.BookingResponse;
import com.app.entities.Booking;
import com.app.service.IBookingService;

@RestController
@RequestMapping("/api/Book")
@CrossOrigin(origins = "*")
public class BookingController {
@Autowired
IBookingService bookService;

		@PostMapping("/{regNo}")
		public  ResponseEntity<?> addBooking(@RequestBody Booking  addBooking,@PathVariable Integer regNo)
		{
		BookingResponse booking=bookService.saveBookingDetail(addBooking,regNo);
		if(booking!=null ) {
			return ResponseEntity.status(201).body(booking);
		}else {
			return ResponseEntity.status(500).body("error");
		}
			
		}
		
		@DeleteMapping("/{id}")
		public ResponseEntity<?> cancelBooking(@PathVariable Integer id)
		{
			boolean status=	bookService.deleteBooking(id);
			if(status ) {
				return ResponseEntity.status(200).body(true);
			}else {
				return ResponseEntity.status(500).body(false);
			}
		}
}
