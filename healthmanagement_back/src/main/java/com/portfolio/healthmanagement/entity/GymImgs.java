package com.portfolio.healthmanagement.entity;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GymImgs {
	private int postsId;
	private int gymId;
	
	private List<GymImgsDetail> imgfiles;
}
