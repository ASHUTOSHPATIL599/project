package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.dao.AccomodationRepository;
import com.app.entities.Accomodation;

@Service
@Transactional
public class AccomodationServiceImpl implements IAccomodationService {
	@Autowired
	AccomodationRepository accomodationRepository;
	
	@Override
	public Accomodation getAccomodationBill(Integer BillNumber) {
		return accomodationRepository.findById(BillNumber).orElseThrow(()->new ResourceNotFoundException("for given Id No Bill found !"));
	}
}
