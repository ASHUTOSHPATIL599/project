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
@NoArgsConstructor
@AllArgsConstructor
@ToString

@Entity
@Table(name = "Meal_tbl")
public class MealDetails extends BaseEntity {
	
	@Column(name = "Meal_Name", nullable = false)
	private String mealName;
	
	@Column(name="meal_desc")
	private String mealDescription;
	
	@Column (name="category")
	private String mealCategory;
	
	@Column(name = "Meal_Price", nullable = false)
	private double mealPrice;

	
	

}
