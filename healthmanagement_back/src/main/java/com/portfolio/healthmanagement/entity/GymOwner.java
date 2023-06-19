package com.portfolio.healthmanagement.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GymOwner {
	private int gymOwnerId;
	private int userId;
	private int gymId;

	private Gym gym;
	private User user;
}
