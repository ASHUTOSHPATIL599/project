package com.app.service;

import java.util.List;


import com.app.entities.SportDetails;

public interface ISportService {

	List<SportDetails> getAllSportDetails();
	boolean addSportDetails(SportDetails mealDetails);
	SportDetails getSportDetailsById(Integer id);
}
