package com.portfolio.healthmanagement.controller;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.healthmanagement.aop.annotation.ValidAspect;
import com.portfolio.healthmanagement.dto.auth.LoginReqDto;
import com.portfolio.healthmanagement.service.AdminService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {
	
	private final AdminService adminService;
	
	@ValidAspect
	@PostMapping("/login")
	public ResponseEntity<?> Login(@Valid @RequestBody LoginReqDto loginReqDto, BindingResult bindingResult) {
		System.out.println(loginReqDto);
		return ResponseEntity.ok(adminService.login(loginReqDto));
	}
	
	@GetMapping("/users/count")
	public ResponseEntity<?> userCount() {
		return ResponseEntity.ok().body(adminService.userCount());
	}
	
	@GetMapping("/gyms/count")
	public ResponseEntity<?> gymCount() {
		return ResponseEntity.ok().body(adminService.gymCount());
	}
	
	@GetMapping("/users/page")
	public ResponseEntity<?> userPage() {
		return ResponseEntity.ok().body(adminService.userPage());
	}
	
	@GetMapping("/users")
	public ResponseEntity<?> getUsers(int page) {
		return ResponseEntity.ok().body(adminService.getUsers(page));
	}
	
	@GetMapping("/gyms/page")
	public ResponseEntity<?> gymPage() {
		return ResponseEntity.ok().body(adminService.gymPage());
	}
	
	@GetMapping("/gyms")
	public ResponseEntity<?> getGyms(int page) {
		return ResponseEntity.ok().body(adminService.getGyms(page));
	}
	
	@GetMapping("/authority")
	public ResponseEntity<?> getAuthority() {
		return ResponseEntity.ok().body(adminService.getAuthority());
	}
	
}
