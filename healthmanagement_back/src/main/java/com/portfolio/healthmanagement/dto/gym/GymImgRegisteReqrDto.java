package com.portfolio.healthmanagement.dto.gym;

import com.portfolio.healthmanagement.entity.GymImgsDetail;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GymImgRegisteReqrDto {
	private int gymId;
	private int postsId;
	private String originName;
	private String tempName;
	private String imgSize;
	
	public GymImgsDetail toEntity() {
		return GymImgsDetail.builder()
					.gymId(gymId)
					.postsId(postsId)
					.originName(originName)
					.tempName(tempName)
					.imgSize(imgSize)
					.build();
	}
}
