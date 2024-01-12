package com.app.service;

import com.app.dto.BookingResponse;
import com.app.entities.Booking;

public interface IBookingService {

	BookingResponse saveBookingDetail(Booking book,Integer id);
	boolean deleteBooking(Integer id);
}
