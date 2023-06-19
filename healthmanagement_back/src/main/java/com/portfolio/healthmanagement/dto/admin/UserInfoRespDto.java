package com.portfolio.healthmanagement.dto.admin;

import java.sql.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserInfoRespDto {
	private int userId;
	private String username;
	private String name;
	private String phone;
	private String email;
	private Date birthDate;
	private Date registeDate;
	private String authority;
}
