package com.portfolio.healthmanagement.dto.response;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class JwtRespDto {

	private String granType;
	private String accessToken;
}
