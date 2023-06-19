package com.portfolio.healthmanagement.dto.gym;

import java.sql.Date;

import javax.validation.constraints.Pattern;

import com.portfolio.healthmanagement.entity.Gym;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RegisterGymReqDto {
	@Pattern(regexp = ".+", 
			message = "헬스장 이름을 입력해주세요.")
	private String gymName;
	
	private String gymAddress;
	
	@Pattern(regexp =  "^\\d{3,4}-\\d{3,4}-\\d{4}$", 
			message = "전화번호를 양식에 맞게 입력해주세요. (ex: 010-1234-5678 or 0505-1234-5678)")
	private String gymTel;
	
	@Pattern(regexp = "^[0-9]{3}-[0-9]{2}-[0-9]{5}$", 
			message = "사업자등록번호를 양식에 맞게 입력해주세요. (ex: 123-45-67890)")
	private String businessNumber;
	
	@Pattern(regexp = "^\\d+$", 
			message = "숫자만 사용 가능합니다.")
	private String gymPrice;
	
	private Date registDate;
	private Date removeDate;
	
	public Gym toEntity() {
		return Gym.builder()
				.gymName(gymName)
				.gymAddress(gymAddress)
				.gymTel(gymTel)
				.businessNumber(businessNumber)
				.gymPrice(gymPrice)
				.registeDate(registDate)
				.removeDate(removeDate)
				.build();
	}
}
