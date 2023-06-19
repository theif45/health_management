package com.portfolio.healthmanagement.dto.auth;

import lombok.Data;

@Data
public class OAuth2ProviderMergeReqDto {
	private String email;
	private String provider;
	private String password;
}
