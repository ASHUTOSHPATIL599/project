package com.app.service;

import java.util.List;

import com.app.entities.Accomodation;
import com.app.entities.Meal;
import com.app.entities.RoomCategory;
import com.app.entities.Sport;

public interface IBillService {


    List<Meal> getMealOrderDetails(Integer recieptId);
    List<Sport> getSportOrderDetails(Integer recieptId);
    List<RoomCategory> getBookedRoomDetails(Integer receiptId);
    Accomodation generateBill(Integer checkInNumber,Integer receiptNumber);

}
