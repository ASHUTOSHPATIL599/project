package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
//JPA annotations
@Entity
@Table(name="bookings_tbl")
public class Booking extends BaseEntity
{
	 @Column(length = 20,name="id_number")
	 private String idNumber;
	 @Column(length = 20,name="nationality")
	 private String nationality;
	 
	 @Column(name="booking_date")
	 @DateTimeFormat(pattern ="")
	 private LocalDate bookingDate;
	 @Column(name="in_date")
	 @DateTimeFormat
	 private LocalDate inDate;
	 @Column(name="out_date")
	 @DateTimeFormat
	 private LocalDate outDate;
	 @OneToOne
	 @JoinColumn(name = "user_regno",nullable = false)
	 private User regNo;
	 @Enumerated(EnumType.STRING)
	 private RoomType roomtype; 
  
	 public Booking(Integer Id) {
		 this.Id=Id;
	 }
	 
}
