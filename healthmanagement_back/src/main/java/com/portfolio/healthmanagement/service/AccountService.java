package com.portfolio.healthmanagement.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.portfolio.healthmanagement.dto.account.ModifyPasswordReqDto;
import com.portfolio.healthmanagement.dto.account.ModifyUserInfoReqDto;
import com.portfolio.healthmanagement.dto.auth.ForgotReqDto;
import com.portfolio.healthmanagement.dto.gym.LikeListRespDto;
import com.portfolio.healthmanagement.dto.gym.MyGymListRespDto;
import com.portfolio.healthmanagement.dto.response.PrincipalRespDto;
import com.portfolio.healthmanagement.entity.User;

public interface AccountService {

	public PrincipalRespDto getPrincipal();
	public User getUserInfo(int userId);
	public int modifyUser(ModifyUserInfoReqDto modifyUserInfoReqDto);
	public int modifyPassword(ModifyPasswordReqDto modifyPasswordReqDto);
	public int updateProfileImg(MultipartFile profileImgFile);
	public int deleteUser(int userId);
	public int setLike(int gymId, int userId);
	public int disLike(int gymId, int userId);
	public List<LikeListRespDto> likeGyms(int userId);
	public List<MyGymListRespDto> myGyms(int userId);
}
