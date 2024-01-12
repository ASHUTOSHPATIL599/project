package com.app.service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.entities.Booking;
import com.app.entities.RoomCategory;
import com.app.entities.RoomImage;

public interface IRoomService {

	public List<RoomCategory> getRoomDetails() ;
	public boolean addBookingDetails(Booking booking) ;
	boolean uploadContents(Integer id,MultipartFile path) throws IOException;
	public boolean updateRoomDetails(RoomCategory roomCategory);
}
