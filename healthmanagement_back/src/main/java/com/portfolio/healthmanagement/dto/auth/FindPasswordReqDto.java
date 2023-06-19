package com.portfolio.healthmanagement.dto.auth;

import com.portfolio.healthmanagement.entity.User;

import lombok.Data;

@Data
public class FindPasswordReqDto {
	private String email;
	private String name;
	private String username;

	public User toEntity() {
		return User.builder().username(username).email(email).name(name).build();
	}
}
