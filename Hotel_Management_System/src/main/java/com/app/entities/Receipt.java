package com.app.entities;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
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
@Table(name="recept_tbl")
public class Receipt extends BaseEntity {
	@OneToOne
	@JoinColumn(name = "room_category",nullable = false)
	private RoomCategory roomCategory;
	
	@OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
	@JoinColumn(name="reciept_id")
	List<Meal> mealOrderList=new ArrayList<>() ;
	
	@OneToMany(cascade = CascadeType.ALL,orphanRemoval = true)
	@JoinColumn(name="reciept_id")
	List<Sport> sportOrderList=new ArrayList<>() ;
	
	 public Receipt(Integer Id) {
		 this.Id=Id;
	 }
	 
	 
}
