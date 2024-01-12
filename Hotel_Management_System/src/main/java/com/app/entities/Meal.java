package com.app.entities;

import java.sql.Timestamp;

import javax.persistence.*;

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
@Table(name="Meal_Order")
public class Meal extends BaseEntity {
	
	@Column(name="check_in_number")
	private int checkInNumber;
	@OneToOne
	@JoinColumn(name = "Meal_details_no")
	private MealDetails mealDetails;
	private int quantity;

	@Column(name="order_time", columnDefinition="TIMESTAMP DEFAULT CURRENT_TIMESTAMP",insertable =false)
	private Timestamp orderTime;

}
