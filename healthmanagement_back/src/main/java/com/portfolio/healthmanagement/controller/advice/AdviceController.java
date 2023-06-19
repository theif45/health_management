package com.portfolio.healthmanagement.controller.advice;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.portfolio.healthmanagement.dto.response.ErrorRespDto;
import com.portfolio.healthmanagement.exception.CustomException;

@RestControllerAdvice
public class AdviceController {

	@ExceptionHandler(CustomException.class)
	public ResponseEntity<?> customException(CustomException e) {
		return ResponseEntity.badRequest().body(new ErrorRespDto<>(e.getMessage(), e.getErrorMap()));
	}
}
