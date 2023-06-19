package com.portfolio.healthmanagement.dto.gym;

import java.util.List;

import lombok.Data;

@Data
public class SearchGymReqDto {
	private int page;
	private String searchValue;
}
