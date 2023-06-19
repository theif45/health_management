package com.portfolio.healthmanagement.dto.admin;

import java.sql.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GymInfoRespDto {
	private int gymId;
	private String gymName;
	private String gymAddress;
	private String gymTel;
	private String businessNumber;
	private Date registeDate;
	private String username;
}
