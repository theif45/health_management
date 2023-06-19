package com.portfolio.healthmanagement.dto.auth;

import com.portfolio.healthmanagement.entity.User;

import lombok.Data;

@Data
public class FindUsernameReqDto {
	private String email;
	private String name;
	
	public User toEntity() {
		return User.builder().email(email).name(name).build();
	}
}
