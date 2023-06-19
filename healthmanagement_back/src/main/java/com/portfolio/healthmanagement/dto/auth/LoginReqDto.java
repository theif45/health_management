package com.portfolio.healthmanagement.dto.auth;

import javax.validation.constraints.Pattern;

import lombok.Data;

@Data
public class LoginReqDto {
	
	@Pattern(regexp = "^[a-zA-Z0-9_-]{3,16}$",
			message = "아이디는 소문자,대문자,숫자,밑줄 및 하이픈을 포함 할 수 있고 3 ~ 16자로 작성")
	private String username;
	
	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,16}$",
			message = "비밀번호는 영문자, 숫자, 특수문자를 포함하여 8 ~ 16자로 작성")
	private String password;
}
