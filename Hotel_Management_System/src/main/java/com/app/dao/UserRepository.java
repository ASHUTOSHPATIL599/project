package com.app.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.entities.RoleEnum;
import com.app.entities.User;

public interface UserRepository extends JpaRepository<User,Integer> {

	User findByEmailAndPassword(String email,String password);

	User findByEmail(String email);
	
	@Query("select u.userRoles from User u where email=:eid")
	String findUserRolesByEmail(@Param("eid") String eid);
	
	@Query("select u.Id from User u where email=:eid")
	Integer getRegIdByEmail(@Param("eid") String eid);
}
