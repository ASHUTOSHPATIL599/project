package com.app.dto;

import com.app.entities.Booking;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class BookingResponse {

	private Booking book;
	private Integer receipId;
}
