package com.app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.dto.AuthResponse;
import com.app.entities.User;
import com.app.jwt.JwtUtils;
import com.app.service.IUserService;

@RestController
@RequestMapping("/api/user")
@CrossOrigin (origins = "*")
public class UserController {
	
	//dep : JWT utils : for generating JWT
		@Autowired
		private JwtUtils utils;
		// dep : Auth mgr
		@Autowired
		private AuthenticationManager manager;
		//dep : user service for handling users
	
	@Autowired
	private IUserService userService;

	public UserController() {
		System.out.println("in ctor of "+getClass());
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> addNewEmp(@RequestBody  User usr)
	{
		System.out.println("in add new emp "+usr);
		return ResponseEntity.status(200).body(userService.registerUser(usr)) ;
	}
	
	@PostMapping("/signin")
	public ResponseEntity<?> authenticateUser(@RequestBody User usr)
	{
		UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(usr.getEmail(),
				usr.getPassword());
		System.out.println("auth token before "+authToken);
		
		try {
			// authenticate the credentials
			Authentication authenticatedDetails = manager.authenticate(authToken);
			System.out.println("auth token again " + authenticatedDetails);
			// => auth succcess
			String token=utils.generateJwtToken(authenticatedDetails);
			String role=userService.getUserRoleByEmail(usr.getEmail());
			Integer regId=userService.getUserRegIDByEmail(usr.getEmail());
			return ResponseEntity.ok(new AuthResponse(token,role,regId));
			
		} catch (BadCredentialsException e) { 
			// send back err resp code
			System.out.println("err "+e);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
		}
		
//		System.out.println("in update  emp dtls"+usr);
//		User user= userService.signIn(usr.getEmail(),usr.getPassword());
//		return ResponseEntity.status(200).body(user);
		
	}
	
}
