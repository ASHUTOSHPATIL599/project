package com.app.service;


import com.app.entities.Sport;

public interface ISportOrderService {
	boolean saveSportOrderDetails(Sport sport,Integer recieptId);
	Sport getSportDetails(Integer id);
}
