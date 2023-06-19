package com.portfolio.healthmanagement.service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.portfolio.healthmanagement.dto.account.ModifyPasswordReqDto;
import com.portfolio.healthmanagement.dto.account.ModifyUserInfoReqDto;
import com.portfolio.healthmanagement.dto.auth.ForgotReqDto;
import com.portfolio.healthmanagement.dto.gym.LikeListRespDto;
import com.portfolio.healthmanagement.dto.gym.MyGymListRespDto;
import com.portfolio.healthmanagement.dto.response.PrincipalRespDto;
import com.portfolio.healthmanagement.entity.User;
import com.portfolio.healthmanagement.repository.AccountRepository;
import com.portfolio.healthmanagement.repository.GymRepository;
import com.portfolio.healthmanagement.repository.UserRepository;
import com.portfolio.healthmanagement.security.PrincipalUserDetails;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AccountServiceImpl implements AccountService {
	
	@Value("${file.path}")
	private String filePath;
	
	private final AccountRepository accountRepository;
	private final UserRepository userRepository;
	private final GymRepository gymRepository;

	@Override
	public PrincipalRespDto getPrincipal() {

		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		PrincipalUserDetails principalUser = (PrincipalUserDetails) authentication.getPrincipal();

		User userEntity = userRepository.findUserByUsername(principalUser.getUsername());
		return userEntity.toPrincipalRespDto();
	}

	@Override
	public User getUserInfo(int userId) {
		return accountRepository.getUserInfo(userId);
	}

	@Override
	public int modifyUser(ModifyUserInfoReqDto modifyUserInfoReqDto) {
		User userEntity = userRepository.findUserByUsername(modifyUserInfoReqDto.getUsername());
		userEntity.setName(modifyUserInfoReqDto.getName());
		userEntity.setPhone(modifyUserInfoReqDto.getPhone());
		return accountRepository.modifyUser(userEntity);
	}

	@Override
	public int modifyPassword(ModifyPasswordReqDto modifyPasswordReqDto) {
		Map<String, Object> map = new HashMap<>();
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String password = passwordEncoder.encode(modifyPasswordReqDto.getPassword());
		map.put("userId", modifyPasswordReqDto.getUserId());
		map.put("password", password);
		return accountRepository.modifyPassword(map);
	}

	@Override
	public int deleteUser(int userId) {
		return accountRepository.deleteUser(userId);
	}

	@Override
	public int updateProfileImg(MultipartFile profileImgFile) {
		String originFileName = profileImgFile.getOriginalFilename();
		String extension = originFileName.substring(originFileName.lastIndexOf('.'));
		String tempFileName = UUID.randomUUID().toString().replaceAll("-", "") + extension;
		
		Path uploadPath = Paths.get(filePath + "profile/" + tempFileName);
		
		try {
			Files.write(uploadPath, profileImgFile.getBytes());
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		PrincipalUserDetails principalUser = (PrincipalUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		return userRepository.updateProfileImg(User.builder()
													.userId(principalUser.getUserId())
													.profile(tempFileName)
													.build());
	}

	@Override
	public int setLike(int gymId, int userId) {
		Map<String, Object> map = new HashMap<>();
		map.put("gymId", gymId);
		map.put("userId", userId);
		
		return gymRepository.setLike(map);
	}

	@Override
	public int disLike(int gymId, int userId) {
		Map<String, Object> map = new HashMap<>();
		map.put("gymId", gymId);
		map.put("userId", userId);
		
		return gymRepository.disLike(map);
	}

	@Override
	public List<LikeListRespDto> likeGyms(int userId) {
		List<LikeListRespDto> list = new ArrayList<>();
		gymRepository.likeGyms(userId).forEach(likeData -> {
			list.add(likeData.toDto());
		});
		
		return list;
	}

	@Override
	public List<MyGymListRespDto> myGyms(int userId) {
		List<MyGymListRespDto> list = new ArrayList<>();
		
		gymRepository.myGyms(userId).forEach(addData -> {
			list.add(addData.toDto());
		});

		return list;
	}
	

}
