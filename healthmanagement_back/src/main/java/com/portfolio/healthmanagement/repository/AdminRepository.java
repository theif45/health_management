package com.portfolio.healthmanagement.repository;

import java.sql.Date;
import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.healthmanagement.entity.Gym;
import com.portfolio.healthmanagement.entity.User;

@Mapper
public interface AdminRepository {
	public int userCount(Date date);
	public int gymCount(Date date);
	public int userPage();
	public List<User> getUsers();
	public int gymPage();
	public List<Gym> getGyms();
}
