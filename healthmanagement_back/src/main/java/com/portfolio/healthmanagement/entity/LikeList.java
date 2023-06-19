package com.portfolio.healthmanagement.entity;

import com.portfolio.healthmanagement.dto.gym.LikeListRespDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
@Builder
public class LikeList {
	private int userId;
	private int gymId;
	private String gymName;
	private String gymAddress;
	private String gymPrice;
	private String gymTel;
	
	public LikeListRespDto toDto(){
		return LikeListRespDto.builder()
				.userId(userId)
				.gymId(gymId)
				.gymName(gymName)
				.gymAddress(gymAddress)
				.gymPrice(gymPrice)
				.gymTel(gymTel)
				.likeStatus(userId==0)
				.build();
	}
	
}
