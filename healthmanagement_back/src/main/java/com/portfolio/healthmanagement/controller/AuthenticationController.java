package com.portfolio.healthmanagement.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.healthmanagement.aop.annotation.ValidAspect;
import com.portfolio.healthmanagement.dto.auth.FindPasswordReqDto;
import com.portfolio.healthmanagement.dto.auth.FindUsernameReqDto;
import com.portfolio.healthmanagement.dto.auth.ForgotReqDto;
import com.portfolio.healthmanagement.dto.auth.LoginReqDto;
import com.portfolio.healthmanagement.dto.auth.OAuth2ProviderMergeReqDto;
import com.portfolio.healthmanagement.dto.auth.OAuth2RegisterReqDto;
import com.portfolio.healthmanagement.dto.auth.registerReqDto;
import com.portfolio.healthmanagement.exception.CustomException;
import com.portfolio.healthmanagement.security.JwtTokenProvider;
import com.portfolio.healthmanagement.service.AccountService;
import com.portfolio.healthmanagement.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RestController
@RequestMapping("/auth")
public class AuthenticationController {

	private final JwtTokenProvider jwtTokenProvider;
	private final AuthenticationService authenticationService;

	@ValidAspect
	@PostMapping("/register")
	public ResponseEntity<?> signup(@Valid @RequestBody registerReqDto registerReqDto, BindingResult bindingResult) {
		authenticationService.checkDuplicatedUsername(registerReqDto.getUsername());
		authenticationService.register(registerReqDto);
		return ResponseEntity.ok().body(true);
	}

	@ValidAspect
	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody LoginReqDto loginReqDto, BindingResult bindingResult) {
		return ResponseEntity.ok().body(authenticationService.login(loginReqDto));
	}

	@GetMapping("/authenticated")
	public ResponseEntity<?> authenticated(@RequestHeader(value = "Authorization") String accessToken) {
		return ResponseEntity.ok(jwtTokenProvider.validateToken(jwtTokenProvider.getToken(accessToken)));
	}

	@ValidAspect
	@PostMapping("/oauth2/register")
	public ResponseEntity<?> oauth2Register(@RequestHeader(value = "registerToken") String registerToken,
			@Valid @RequestBody OAuth2RegisterReqDto oAuth2RegisterReqDto, BindingResult bindingResult) {
		
		boolean validatedFlag = jwtTokenProvider.validateToken(jwtTokenProvider.getToken(registerToken));
		
		if(!validatedFlag) {
			throw new CustomException("회원가입 요청 시간이 초과하였습니다.");
		}
		
		authenticationService.checkDuplicatedUsername(oAuth2RegisterReqDto.getUsername());
		return ResponseEntity.ok(authenticationService.oauth2Registe(oAuth2RegisterReqDto));
	}
	
	@PutMapping("/oauth2/merge")
	public ResponseEntity<?> providerMerge(@RequestBody OAuth2ProviderMergeReqDto oAuth2ProviderMergeReqDto) {
		if(!authenticationService.checkPassword(oAuth2ProviderMergeReqDto)) {
			throw new CustomException("비밀번호가 일치하지 않습니다.");
		};
		return ResponseEntity.ok(authenticationService.oauth2ProviderMerge(oAuth2ProviderMergeReqDto));
	}
	
	@GetMapping("/forgot/username")
	public ResponseEntity<?> findUsername(FindUsernameReqDto findUsernameReqDto){
		return ResponseEntity.ok(authenticationService.findUsernameByEmailAndName(findUsernameReqDto));
	}
	
	@GetMapping("/forgot/password")
	public ResponseEntity<?> findUserPassword(FindPasswordReqDto findPasswordReqDto){
		return ResponseEntity.ok(authenticationService.findPasswordByEmailAndNameAndId(findPasswordReqDto));
	}

	@PutMapping("/forgot/password/change")
	public ResponseEntity<?> forgotpasswordinfo(@RequestBody ForgotReqDto forgotReqDto){
		return ResponseEntity.ok(authenticationService.forgotPassword(forgotReqDto));
	}
	
		

}
