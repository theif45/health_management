package com.portfolio.healthmanagement.controller;

import java.util.Map;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.portfolio.healthmanagement.aop.annotation.ValidAspect;
import com.portfolio.healthmanagement.dto.gym.RegisterGymImgsReqDto;
import com.portfolio.healthmanagement.dto.gym.RegisterGymReqDto;
import com.portfolio.healthmanagement.dto.gym.SearchGymReqDto;
import com.portfolio.healthmanagement.service.GymService;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
public class GymController {
	
	private final GymService gymService;
	
	@GetMapping("/gyms/{gymId}")
	public ResponseEntity<?> getGym(@PathVariable int gymId){
		return ResponseEntity.ok().body(gymService.getGym(gymId));
	}
	
	@GetMapping("/gyms/search")
	public ResponseEntity<?> searchGyms (SearchGymReqDto searchGymReqDto){
		return ResponseEntity.ok().body(gymService.searchGyms(searchGymReqDto));
	}
	
	@GetMapping("/gyms/locations")
	public ResponseEntity<?> nearbyGymAddressesAndGymName(String myAddress) {
		return ResponseEntity.ok().body(gymService.nearbyGymAddressesAndGymName(myAddress));
	}
	
	@ValidAspect
	@PostMapping("/gyms/register")
	public ResponseEntity<?> createGym(@Valid @RequestBody RegisterGymReqDto registerGymReqDto, BindingResult bindingResult){
		return ResponseEntity.ok().body(gymService.addGym(registerGymReqDto));
	}
	
	@PostMapping("/gyms/images/register")
	public ResponseEntity<?> registerGymImg(RegisterGymImgsReqDto gymImgsReqDto){
		return ResponseEntity.ok(gymService.registerGymImgs(gymImgsReqDto));
	}
	
	@GetMapping("/gyms/{gymId}/images")
	public ResponseEntity<?> getImg(@PathVariable int gymId){
		return ResponseEntity.ok().body(gymService.getImg(gymId));
	}
	
	@GetMapping("/gyms/{gymId}/likes")
	public ResponseEntity<?> getLikeCount(@PathVariable int gymId){
		return ResponseEntity.ok().body(gymService.getLikeCount(gymId));
	}

	@GetMapping("/gyms/{gymId}/favorites")
	public ResponseEntity<?> getLikeStatus(@PathVariable int gymId, @RequestParam int userId){
		return ResponseEntity.ok().body(gymService.getLikeStatus(gymId, userId));
	}
	
}

