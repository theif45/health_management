package com.portfolio.healthmanagement.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Authority {
	
	private int authorityId;
	private int userId;
	private int roleId;
	
	private Role role;
}
