package com.app.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.dao.AccomodationRepository;
import com.app.dao.BookingRepository;
import com.app.dao.RoomRepository;
import com.app.dao.UserRepository;
import com.app.entities.Accomodation;
import com.app.entities.Booking;
import com.app.entities.RoomCategory;
import com.app.entities.User;

@Service
@Transactional
public class UserServiceImpl implements IUserService {

	@Autowired
	UserRepository userRepository;
	@Autowired
	AccomodationRepository accomodationRepositoy;

	// password enc
	@Autowired
	private PasswordEncoder encoder;
		
	@Override
	public User registerUser(User userToBePersist) {
		
		//  encode pwd
		userToBePersist.setPassword(encoder.encode(userToBePersist.getPassword()));
		
		User user=userRepository.save(userToBePersist);
		return user ;
	}

//	@Override
//	public User signIn(String email, String password) {
//		return userRepository.findByEmailAndPassword(email,password);
//	}
	

	@Override
	public String getUserRoleByEmail(String email) {
		String role= userRepository.findUserRolesByEmail(email);
		System.out.println(role);
		return role;
	}
	
	@Override
	public Integer getUserRegIDByEmail(String email) {
		int regId= userRepository.getRegIdByEmail(email);
		System.out.println("regid Is: "+regId);
		return regId;
	}
	
	@Override
	public boolean updateUserDetails(User user) {
		User persistentUser=userRepository.findById(user.Id).orElseThrow(()->new ResourceNotFoundException("User Not Found !"));
	    persistentUser.setPassword(user.getPassword());
		persistentUser.setPhoneNumber(user.getPhoneNumber());
		userRepository.save(persistentUser);
	    return true;
	}

	

	
}
