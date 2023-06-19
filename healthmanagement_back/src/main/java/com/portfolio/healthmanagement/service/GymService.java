package com.portfolio.healthmanagement.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import com.portfolio.healthmanagement.dto.gym.GetGymRespDto;
import com.portfolio.healthmanagement.dto.gym.GymImgRespDto;
import com.portfolio.healthmanagement.dto.gym.RegisterGymImgsReqDto;
import com.portfolio.healthmanagement.dto.gym.RegisterGymReqDto;
import com.portfolio.healthmanagement.dto.gym.SearchGymReqDto;
import com.portfolio.healthmanagement.entity.GymImgsDetail;

public interface GymService {
	public GetGymRespDto getGym(int gymId);
	public Map<String, Object> searchGyms(SearchGymReqDto searchGymReqDto);
	public int addGym(RegisterGymReqDto registerGymReqDto);
	public int getLikeCount(int gymId);
	public int getLikeStatus(int gymId, int userId);
	public Map<String, Object> nearbyGymAddressesAndGymName(String myAddress);
	public int registerGymImgs(RegisterGymImgsReqDto gymImgsReqDto);
	public List<GymImgsDetail> uploadFile(int gymId, int postsId, List<MultipartFile> files);
	public List<GymImgRespDto> getImg(int gymId);
}
