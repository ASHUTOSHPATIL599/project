package com.app.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.dao.AccomodationRepository;
import com.app.dao.BillRepository;
import com.app.dao.MealOrderRepository;
import com.app.dao.SportOrderRepository;
import com.app.entities.Accomodation;
import com.app.entities.Booking;
import com.app.entities.Meal;
import com.app.entities.Receipt;
import com.app.entities.RoomCategory;
import com.app.entities.Sport;

@Service
@Transactional
public class BillServiceImpl implements IBillService {

	@Autowired
	BillRepository billRepository;
	@Autowired
	AccomodationRepository  accomodationRepository;
	
	@Override
	public List<Meal> getMealOrderDetails(Integer recieptId) {
		return billRepository.getMealOrdersByRecieptId(recieptId);
	}

	@Override
	public List<Sport> getSportOrderDetails(Integer recieptId) {
		List<Sport> sportList=  billRepository.getSportOrdersByRecieptId(recieptId);
		System.out.println(sportList);
		 return sportList;
	}

	@Override
	public List<RoomCategory> getBookedRoomDetails(Integer receiptId) {
		return billRepository.getRoomDetails();
	}

	@Override
	public Accomodation generateBill(Integer checkInNumber, Integer receiptNumber) {
		List<Meal> mealList=getMealOrderDetails(receiptNumber);
		List<Sport> sportList=getSportOrderDetails(receiptNumber);
		List<RoomCategory> roomCategory=getBookedRoomDetails(receiptNumber) ;
		
		// calculating meal order charges
		double mealCharges=0;
		for(Meal meal:mealList) {
			mealCharges +=meal.getMealDetails().getMealPrice();
		}
		
		// calculating sport activity charges
		double sportCharges=0;
		for(Sport sport:sportList) {
			sportCharges +=sport.getSportDetails().getSportPrice()* (sport.getDuration());
		}
		
		// booked room charges
		double roomCharges=0;
		for(RoomCategory rc:roomCategory) {
			roomCharges=roomCharges+rc.getCost();
		}
 		
		// calculating total charges
		double totalCharges=roomCharges+mealCharges+sportCharges;
		
		Accomodation accomodationBill= new Accomodation(roomCharges,mealCharges,sportCharges,totalCharges,false,new Booking(checkInNumber),new Receipt( receiptNumber));
		Accomodation accomodation=accomodationRepository.save(accomodationBill);
		return accomodation==null?null:accomodation;
	}

	

}
