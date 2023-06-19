package com.portfolio.healthmanagement.dto.account;

import lombok.Data;

@Data
public class ModifyPasswordReqDto {
	private int userId;
	private String password;
}
