package com.portfolio.healthmanagement.dto.gym;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GymImgRespDto {
	private int postsImgId;
	private int postsId;
	private int gymId;
	private String originName;
	private String tempName;
	private String imgSize;
}
