package com.app.dao;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entities.SportDetails;

public interface SportRepository extends JpaRepository<SportDetails, Integer> {

}
