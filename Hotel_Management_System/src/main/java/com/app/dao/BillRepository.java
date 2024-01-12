package com.app.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.entities.Meal;
import com.app.entities.Receipt;
import com.app.entities.RoomCategory;
import com.app.entities.Sport;

@Repository
public interface BillRepository extends JpaRepository<Receipt, Integer> {

	@Query("select rct.mealOrderList from Receipt rct join Meal ml on rct.Id=ml.Id where rct.Id=:rId")
	List<Meal> getMealOrdersByRecieptId(@Param("rId") Integer rId);
	
	@Query("select rct.sportOrderList from Receipt rct join Sport sp on rct.Id=sp.Id where rct.Id=:rId")
	List<Sport> getSportOrdersByRecieptId(@Param("rId") Integer rId);
	
	// get room and category details for pricing
	@Query("select rct.roomCategory from  Receipt rct Join RoomCategory rc on rct.Id=rc.Id")
	List<RoomCategory> getRoomDetails();
	
	// to avoid LazyInitialization Exception
	@Query("select rct from Receipt rct Join fetch rct.sportOrderList ")
	Receipt getReceiptAndSportOrderList(Integer recieptId) ;
	
	// to avoid LazyInitialization Exception
	@Query("select rct from Receipt rct  Join fetch rct.mealOrderList where rct.Id=:rctId")
	Receipt getReceiptAndMealOrderList(@Param("rctId") Integer rctId);
}
