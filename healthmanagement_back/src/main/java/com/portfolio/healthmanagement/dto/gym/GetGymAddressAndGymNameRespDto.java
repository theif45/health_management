package com.portfolio.healthmanagement.dto.gym;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class GetGymAddressAndGymNameRespDto {
	private String GymAddress;
	private String GymName;
}
