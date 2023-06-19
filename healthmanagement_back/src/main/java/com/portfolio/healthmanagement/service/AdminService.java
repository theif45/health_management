package com.portfolio.healthmanagement.service;

import java.util.List;
import java.util.Map;

import com.portfolio.healthmanagement.dto.admin.GymInfoRespDto;
import com.portfolio.healthmanagement.dto.admin.UserInfoRespDto;
import com.portfolio.healthmanagement.dto.auth.LoginReqDto;
import com.portfolio.healthmanagement.entity.User;

public interface AdminService {

	public String login(LoginReqDto loginReqDto);
	public List<Map<String, Object>> userCount();
	public List<Map<String, Object>> gymCount();
	public int userPage();
	public List<UserInfoRespDto> getUsers(int page);
	public int gymPage();
	public List<GymInfoRespDto> getGyms(int page);
	public String getAuthority();
}
