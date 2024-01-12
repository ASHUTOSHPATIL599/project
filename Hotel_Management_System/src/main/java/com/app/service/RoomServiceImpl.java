package com.app.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;

import javax.annotation.PostConstruct;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;


import org.springframework.stereotype.Service;

import com.app.customExceptions.ResourceNotFoundException;
import com.app.dao.BookingRepository;
import com.app.dao.RoomRepository;

import com.app.entities.Booking;

import com.app.entities.RoomCategory;
import com.app.entities.RoomImage;

import lombok.extern.slf4j.Slf4j;

@Service

@Transactional // required only for storing / retrieving the image path form emp table
@Slf4j

public class RoomServiceImpl implements IRoomService {

	@Autowired 
	private RoomRepository roomRepository;
	@Autowired
	private BookingRepository bookingRepository; 
	
	
	@Value("${file.upload.folder}")
	private String folder;
	
	@PostConstruct
	public void anyInit() {
		log.info("in init {} ", folder);
		// create "images" folder : if one does not exist!
		File dir = new File(folder);
		if (!dir.exists())
			log.info("dir created {} ", dir.mkdirs());
		else
			log.info("dir alrdy exists.... ");
	}
	
	@Override
	public List<RoomCategory> getRoomDetails() {
		 List<RoomCategory> list=roomRepository.findAll();
		 return list;
	}

	@Override
	public boolean addBookingDetails(Booking booking) {
		Booking book= bookingRepository.save(booking);
		return book==null?true:false;
	}

	@Override
	public boolean uploadContents(Integer id, MultipartFile imageFile) throws IOException {
		RoomCategory rCategory = roomRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Invalid  Id"));
		// emp id valid , emp : PERSISTENT
		// create the image path =folder + orig file name
		
		String imagePath = folder.concat(File.separator).concat(imageFile.getOriginalFilename());
		RoomImage rImage=new RoomImage(imagePath);
		
		// copy the contents from multipart file --> destination path
		// java.nio.file.Files : public boolean copy(InputStream in , Path
		// dest,CopyOptions options)
		log.info("bytes copied {} ",
				Files.copy(imageFile.getInputStream(), Paths.get(imagePath), StandardCopyOption.REPLACE_EXISTING));
		// store image path in db
		
		return rCategory.getRList().add(rImage);// modifying the state of persistent entity
		
	}

	@Override
	public boolean updateRoomDetails(RoomCategory roomCategory) {
		RoomCategory persistentRoomObj= roomRepository.findById(roomCategory.getId()).orElseThrow(()->new ResourceNotFoundException("No roomCategory Found"));
		persistentRoomObj.setRoomtype(roomCategory.getRoomtype());
		persistentRoomObj.setRoomDescription(roomCategory.getRoomDescription());
		persistentRoomObj.setAvailable(roomCategory.isAvailable());	
		persistentRoomObj.setRoomCount(roomCategory.getRoomCount());
		persistentRoomObj.setCost(roomCategory.getCost());
		return roomRepository.save(persistentRoomObj)==null?false:true;
		
	}

}
