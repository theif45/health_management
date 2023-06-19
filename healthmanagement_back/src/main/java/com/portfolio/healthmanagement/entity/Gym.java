package com.portfolio.healthmanagement.entity;

import java.sql.Date;

import com.portfolio.healthmanagement.dto.admin.GymInfoRespDto;
import com.portfolio.healthmanagement.dto.gym.GetGymAddressAndGymNameRespDto;
import com.portfolio.healthmanagement.dto.gym.GetGymRespDto;
import com.portfolio.healthmanagement.dto.gym.SearchGymRespDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Gym {
	
	private int gymId;
	private String gymName;
	private String gymAddress;
	private String gymTel;
	private String businessNumber;
	private String gymPrice;
	private int likeCount;
	private Date registeDate;
	private Date removeDate;
	
	private GymImgsDetail gymImgsDetail;
	private GymOwner gymOwner;
	
	public SearchGymRespDto toDto() {
		return SearchGymRespDto.builder()
				.gymId(gymId)
				.gymName(gymName)
				.gymAddress(gymAddress)
				.gymTel(gymTel)
				.businessNumber(businessNumber)
				.gymPrice(gymPrice)
				.likeCount(likeCount)
				.registeDate(registeDate)
				.removeDate(removeDate)
				.build();
				
	}
	
	public GetGymRespDto toGetGymDto() {
		return GetGymRespDto.builder()
				.gymId(gymId)
				.gymName(gymName)
				.gymAddress(gymAddress)
				.gymTel(gymTel)
				.businessNumber(businessNumber)
				.gymPrice(gymPrice)
				.registeDate(registeDate)
				.removeDate(removeDate)
				.build();
	
	}
	
	public GetGymAddressAndGymNameRespDto toGymAddressAndNameDto() {
		return GetGymAddressAndGymNameRespDto.builder()
				.GymAddress(gymAddress)
				.GymName(gymName)
				.build();
	}
	
	public GymInfoRespDto toGymInfoRespDto() {
		return GymInfoRespDto.builder()
				.gymId(gymId)
				.gymName(gymName)
				.gymAddress(gymAddress)
				.gymTel(gymTel)
				.businessNumber(businessNumber)
				.registeDate(registeDate)
				.username(gymOwner.getUser().getUsername())
				.build();
	}


}
