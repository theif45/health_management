package com.portfolio.healthmanagement.repository;

import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.healthmanagement.entity.User;

@Mapper
public interface AccountRepository {
	
	public User getUserInfo(int userId);
	public int modifyUser(User user);
	public int modifyPassword(Map<String, Object> map);
	public int deleteUser(int userId);
}
