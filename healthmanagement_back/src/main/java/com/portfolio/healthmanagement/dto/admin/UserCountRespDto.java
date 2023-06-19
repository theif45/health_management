package com.portfolio.healthmanagement.dto.admin;

import java.sql.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserCountRespDto {
	private Date registeDate;
	private int userCount;
}
