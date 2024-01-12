package com.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.app.dao.BillRepository;
import com.app.dao.BookingRepository;
import com.app.dao.RoomRepository;
import com.app.dto.BookingResponse;
import com.app.entities.Booking;
import com.app.entities.Receipt;
import com.app.entities.RoomCategory;
import com.app.entities.RoomType;
import com.app.entities.User;
@Service

@Transactional
public class BookingServiceImpl implements IBookingService {

	@Autowired 
	private BookingRepository bookRepo;
	@Autowired
	BillRepository billRepository;
	@Autowired
	Receipt receipt;
	@Autowired
	RoomRepository roomRepository;
	
	@Override
	public BookingResponse saveBookingDetail(Booking book,Integer id)
	{
		RoomCategory roomCategory=roomRepository.findRoomCategoryByRoomtype(book.getRoomtype());
		roomCategory.reduceRoomCount();
		receipt.setRoomCategory(roomCategory);
		Receipt rct=billRepository.save(receipt);
	
		book.setRegNo(new User(id));
		Booking bk=bookRepo.save(book);
		
		return new BookingResponse(bk,rct.getId());
	}

	@Override
	public boolean deleteBooking(Integer id) {
		try {
			bookRepo.deleteById(id);
		}catch(Exception e)
		{
			return false;
		}
		
		return true;
	}

}
