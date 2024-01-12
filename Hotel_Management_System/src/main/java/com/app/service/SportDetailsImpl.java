package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.dao.SportRepository;
import com.app.entities.MealDetails;
import com.app.entities.SportDetails;

@Service
@Transactional
public class SportDetailsImpl implements ISportService {

	@Autowired
	SportRepository sportRepository;
	
	@Override
	public List<SportDetails> getAllSportDetails() {
		List<SportDetails> sportDetailsList= sportRepository.findAll();
		return sportDetailsList;
	}

	@Override
	public boolean addSportDetails(SportDetails sportDetails) {
		SportDetails sDetail=sportRepository.save(sportDetails);
		return sDetail==null?false:true;
	}

	@Override
	public SportDetails getSportDetailsById(Integer id) {
		SportDetails sportDetails=sportRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("no Details Found"));
	    return sportDetails;
	}

}
