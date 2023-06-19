package com.portfolio.healthmanagement.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.portfolio.healthmanagement.dto.account.ModifyPasswordReqDto;
import com.portfolio.healthmanagement.dto.account.ModifyUserInfoReqDto;
import com.portfolio.healthmanagement.dto.auth.ForgotReqDto;
import com.portfolio.healthmanagement.service.AccountService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/account")
@RequiredArgsConstructor
public class AccountController {

	private final AccountService accountService;
	
	@GetMapping("/principal")
	public ResponseEntity<?> principal() {
		return ResponseEntity.ok().body(accountService.getPrincipal());
	}
	
	@GetMapping("/users/{userId}")
	public ResponseEntity<?> getUserInfo(@PathVariable int userId) {
		return ResponseEntity.ok(accountService.getUserInfo(userId));
	}
	
	@PutMapping("/users/{userId}")
	public ResponseEntity<?> modifyuserInfo(@RequestBody ModifyUserInfoReqDto modifyUserInfoReqDto){
		return ResponseEntity.ok(accountService.modifyUser(modifyUserInfoReqDto));
	}
	
	@DeleteMapping("/users/{userId}")
	public ResponseEntity<?> deleteUser(@PathVariable int userId){
		return ResponseEntity.ok(accountService.deleteUser(userId));
	}
	
	@PutMapping("/users/password/update")
	public ResponseEntity<?> modifyPassword(@RequestBody ModifyPasswordReqDto modifyPasswordReqDto) {
		return ResponseEntity.ok(accountService.modifyPassword(modifyPasswordReqDto));
	}

	@PostMapping("/user/mypage/profile")
	public ResponseEntity<?> updateProfileImg(@RequestPart MultipartFile profileImgFile){
		return ResponseEntity.ok(accountService.updateProfileImg(profileImgFile));
	}
	
	@GetMapping("/users/{userId}/favorites")
	public ResponseEntity<?> likeGyms(@PathVariable int userId){
		return ResponseEntity.ok().body(accountService.likeGyms(userId));
	}
	
	@PostMapping("/users/favorites/{gymId}")
	public ResponseEntity<?> setLike(@PathVariable int gymId, @RequestBody Map<String, Integer> requestMap){
		return ResponseEntity.ok().body(accountService.setLike(gymId, requestMap.get("userId")));
	}

	@DeleteMapping("/users/favorites/{gymId}")
	public ResponseEntity<?> disLike(@PathVariable int gymId, int userId){
		return ResponseEntity.ok().body(accountService.disLike(gymId, userId));
	}
	
	@GetMapping("/users/{userId}/gyms")
	public ResponseEntity<?> myGyms(@PathVariable int userId ){
		return ResponseEntity.ok().body(accountService.myGyms(userId));
	}
	
	
}
