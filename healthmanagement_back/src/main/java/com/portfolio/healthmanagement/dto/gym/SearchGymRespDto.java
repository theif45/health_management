package com.portfolio.healthmanagement.dto.gym;

import java.sql.Date;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SearchGymRespDto {
	private int gymId;
	private String gymName;
	private String gymAddress;
	private String gymTel;
	private String businessNumber;
	private String gymPrice;
	private int gymOwnerId;
	private int likeCount;
	private Date registeDate;
	private Date removeDate;
}
