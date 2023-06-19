package com.portfolio.healthmanagement.entity;

import java.sql.Date;
import java.util.List;

import com.portfolio.healthmanagement.dto.admin.UserCountRespDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class UserCount {
	private Date registeDate;
	private int userCount;
	
	public UserCountRespDto toDto(){
		return UserCountRespDto.builder()
				.registeDate(registeDate)
				.userCount(userCount)
				.build();
	}
}
