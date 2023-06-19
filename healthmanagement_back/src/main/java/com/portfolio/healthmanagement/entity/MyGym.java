package com.portfolio.healthmanagement.entity;

import com.portfolio.healthmanagement.dto.gym.MyGymListRespDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class MyGym {
	private int userId;
	private int gymId;
	private String gymName;
	private String gymTel;
	private String gymAddress;
	private String gymPrice;
	
	public MyGymListRespDto toDto() {
		return MyGymListRespDto.builder()
				.userId(userId)
				.gymId(gymId)
				.gymName(gymName)
				.gymAddress(gymAddress)
				.gymTel(gymTel)
				.gymPrice(gymPrice)
				.build();
	}
	
	

}
