package com.app.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.dao.BillRepository;
import com.app.dao.MealOrderRepository;
import com.app.entities.Meal;
import com.app.entities.Receipt;

@Service
@Transactional
public class MealOrderServiceImpl implements IMealOrderService {

	@Autowired
	MealOrderRepository mealordeRepository;
	@Autowired
    BillRepository billRepository;
	
	@Override
	public boolean saveMealOrderDetails(Meal meal,Integer recieptId) {
		
		Receipt receipt=billRepository.findById(recieptId).orElseThrow(()->new ResourceNotFoundException("no Receipt Entry Found"));
		receipt.getMealOrderList().add(meal);
		Receipt rReceipt=billRepository.save(receipt);
		return rReceipt==null?false:true;
	}

	@Override
	public Meal getMealDetails(Integer id) {
		Meal meal=mealordeRepository.findById(id).orElseThrow(()->new ResourceNotFoundException("Meal order Details Not Found"));
		return meal;
	}

}
