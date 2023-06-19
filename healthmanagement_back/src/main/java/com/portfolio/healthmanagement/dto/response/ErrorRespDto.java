package com.portfolio.healthmanagement.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ErrorRespDto<T> {
	
	private String message;
	private T errorData;
}
