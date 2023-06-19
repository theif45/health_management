package com.portfolio.healthmanagement.entity;

import java.util.List;

import com.portfolio.healthmanagement.dto.gym.GymImgRespDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GymImgsDetail {
	private int postsImgId;
	private int postsId;
	private int gymId;
	private String originName;
	private String tempName;
	private String imgSize;
	
	public GymImgRespDto toDto() {
		return GymImgRespDto.builder()
							.postsImgId(postsImgId)
							.postsId(postsId)
							.gymId(gymId)
							.originName(originName)
							.tempName(tempName)
							.imgSize(imgSize)
							.build();
	}
}

	
