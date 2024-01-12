package com.app.service;

import java.util.List;

import com.app.entities.Accomodation;
import com.app.entities.Booking;
import com.app.entities.RoomCategory;
import com.app.entities.User;

public interface IUserService {

	User registerUser(User TransientObject);
	//User signIn(String email, String password);
	boolean updateUserDetails(User user);

	String getUserRoleByEmail(String email);
	
	public Integer getUserRegIDByEmail(String email);
}
