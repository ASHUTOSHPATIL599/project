package com.app.controller;

import java.io.IOException;
import java.util.List;

import javax.validation.Valid;

import org.hibernate.validator.constraints.Range;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.entities.RoomCategory;
import com.app.service.IRoomService;
import com.app.service.ImageHandlingService;
import com.app.service.RoomServiceImpl;

@RestController
@RequestMapping("/api/Home")
@CrossOrigin(origins = "*")
public class HomeController {


	@Autowired	
	private IRoomService roomService;
	

	@Autowired
	private ImageHandlingService imageservice;

	
	@GetMapping
	public  ResponseEntity<?> getAllRoomDetails(){
		System.out.println("in fetch all ");
		return ResponseEntity.status(200).body(roomService.getRoomDetails());  
				
	}

	@GetMapping(value = "/{Id}/images",produces = 
       {MediaType.IMAGE_GIF_VALUE,MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE})
    public ResponseEntity<?> getRoomImage(@PathVariable Integer Id) throws IOException{
		byte[] image =imageservice.getImageById(Id);
		return ResponseEntity.ok(image);
	}
	
	@PostMapping("/{Id}/images")
	public ResponseEntity<?> uploadImage(@PathVariable Integer Id, @RequestParam MultipartFile imageFile)
			throws IOException {
		System.out.println("in upload image " + Id + " orig file name " + imageFile.getOriginalFilename() + " size "
				+ imageFile.getSize());
		return ResponseEntity.status(HttpStatus.CREATED).body(roomService.uploadContents(Id, imageFile));
	}
	
	@GetMapping(value="/{imageId}/carousel" ,produces = 
	{MediaType.IMAGE_GIF_VALUE,MediaType.IMAGE_JPEG_VALUE,MediaType.IMAGE_PNG_VALUE})
    public ResponseEntity<?> getCarouselImage(@PathVariable int imageId) throws IOException{
		byte[] image =imageservice.getCarouselImage(imageId);
		return ResponseEntity.ok(image);
	}
	
	@PutMapping("/update")
	public ResponseEntity<?> updateRoomDetails(@RequestBody RoomCategory roomCategory){
		boolean status=roomService.updateRoomDetails(roomCategory);
		if(status) {
			return ResponseEntity.status(200).body("success");
		}else {
			return ResponseEntity.status(400).body("error"); // 400: Bad Request
		}
	}
}
