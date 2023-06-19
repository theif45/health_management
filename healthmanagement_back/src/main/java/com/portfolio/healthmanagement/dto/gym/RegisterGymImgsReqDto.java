package com.portfolio.healthmanagement.dto.gym;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.portfolio.healthmanagement.entity.GymImgs;

import lombok.Data;

@Data
public class RegisterGymImgsReqDto {
	private int gymId;
	private List<MultipartFile> imgFiles;
	
	public GymImgs toEntity() {
		return GymImgs.builder()
					.gymId(gymId)
					.build();
	}
}
