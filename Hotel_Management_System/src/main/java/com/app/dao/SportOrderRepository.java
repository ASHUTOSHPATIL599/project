package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.Sport;

public interface SportOrderRepository extends JpaRepository<Sport, Integer> {

	
}
