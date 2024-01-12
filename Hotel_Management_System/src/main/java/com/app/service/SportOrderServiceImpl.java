package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.dao.BillRepository;
import com.app.dao.SportOrderRepository;
import com.app.entities.Receipt;
import com.app.entities.Sport;
@Service
@Transactional
public class SportOrderServiceImpl implements ISportOrderService {

	@Autowired
	SportOrderRepository sportorderRepository;
	@Autowired
	BillRepository billRepository;
	
	@Override
	public boolean saveSportOrderDetails(Sport sport,Integer recieptId) {
		
		Receipt receipt=billRepository.findById(recieptId).orElseThrow(()->new ResourceNotFoundException("No Reciept Entry Found !!"));
		receipt.getSportOrderList().add(sport);
		Receipt rReceipt=billRepository.save(receipt);
		return rReceipt==null?false:true;
	}

	@Override
	public Sport getSportDetails(Integer id) {
		Sport sport=sportorderRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Meal order Details Not Found"));
		return sport;
	}

}
