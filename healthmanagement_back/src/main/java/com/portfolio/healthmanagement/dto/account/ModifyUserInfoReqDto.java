package com.portfolio.healthmanagement.dto.account;

import lombok.Data;

@Data
public class ModifyUserInfoReqDto {
	private String username;
	private String name;
	private String phone;
}
