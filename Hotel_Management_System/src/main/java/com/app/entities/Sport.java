package com.app.entities;

import java.sql.Timestamp;
import java.util.Date;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "Sport_order_tbl")
public class Sport extends BaseEntity {
    
	private int checkInNumber;
	@OneToOne
	@JoinColumn(name = "Sport_no")
	private SportDetails sportDetails;
	@Column(name = "time_in_hr", nullable = false)
	private int duration;
	
	@Column(name="order_time", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP",insertable =false)
	private Timestamp orderTime;

	
	public Sport(int checkInNumber,int duration) {
		this.checkInNumber=checkInNumber;
		this.duration=duration;
	}
	
	public Sport(int checkInNumber,int duration,SportDetails sportDetails) {
		this.checkInNumber=checkInNumber;
		this.duration=duration;
		this.sportDetails=sportDetails;
	}
}
