package com.portfolio.healthmanagement.dto.gym;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MyGymListRespDto {
	private int userId;
	private int gymId;
	private String gymName;
	private String gymAddress;
	private String gymTel;
	private String gymPrice;
	
	

}
