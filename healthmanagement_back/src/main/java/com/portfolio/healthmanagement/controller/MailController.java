package com.portfolio.healthmanagement.controller;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.healthmanagement.service.MailService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/mail")
@RequiredArgsConstructor

public class MailController {
	private final MailService mailService;
	
	@PostMapping("/send")
	public ResponseEntity<?> send(@RequestBody Map<String, String> requestData) {
		return ResponseEntity.ok(mailService.validAndSendEmail(requestData.get("email")));
	}
}
