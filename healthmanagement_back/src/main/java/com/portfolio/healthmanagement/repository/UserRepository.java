package com.portfolio.healthmanagement.repository;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import com.portfolio.healthmanagement.entity.Authority;
import com.portfolio.healthmanagement.entity.LikeList;
import com.portfolio.healthmanagement.entity.MyGym;
import com.portfolio.healthmanagement.entity.User;

@Mapper
public interface UserRepository {
	public User findUserByUsername(String username);// userId 중복 확인
	public User findUserByEmail(String email); 
	public String findUserByEmailAndName(User user); 
	public int findPasswordByEmailAndNameAndUsername(User user); 
	public int saveUser(User user);
	public int saveAuthority(Authority authority);
	public int updateProvider(User user);
	public int updateProfileImg(User user);
	public boolean forgotPassword(String email, String password);
}
