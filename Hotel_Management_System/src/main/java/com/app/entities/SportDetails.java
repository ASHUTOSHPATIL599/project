package com.app.entities;

import javax.persistence.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import javax.persistence.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "sport_tbl")
public class SportDetails extends BaseEntity {
	
	@Column(name = "Sport_Name", nullable = false)
	private String sportName;
	
	@Column(name="sport_desc", length=1000,nullable = false)
	private String sportDesc;
	
	@Column(name = "Sport_Price", nullable = false)
	private double sportPrice;
	
	public SportDetails(String sportName,double sportPrice){
		this.sportName=sportName;
		this.sportPrice=sportPrice;
	}
	
}
