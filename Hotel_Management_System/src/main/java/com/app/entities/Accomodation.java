package com.app.entities;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

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

@Entity
@Table(name="accomodation_tbl")
public class Accomodation extends BaseEntity {
	
	
	@Column(name="room_chareges")
	private double roomChareges;
	
	@Column(name="meal_chareges")
	private double mealCharges;
	
	@Column(name="sport_chareges")
	private double sportCharges;
	
	@Column(name="total_chareges")
	private double totalcharges;
	private boolean isPaid;
	@OneToOne
	@JoinColumn(name = "check_in_number",nullable = false)
	private Booking checkInNumber;
	@OneToOne
	@JoinColumn(name = "recept_no",nullable = false)
	private Receipt receptNo;
	
}
