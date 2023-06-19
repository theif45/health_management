package com.portfolio.healthmanagement.service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.security.Principal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.portfolio.healthmanagement.dto.gym.MyGymListRespDto;
import com.portfolio.healthmanagement.dto.gym.RegisterGymImgsReqDto;
import com.portfolio.healthmanagement.dto.gym.GetGymAddressAndGymNameRespDto;
import com.portfolio.healthmanagement.dto.gym.GetGymRespDto;
import com.portfolio.healthmanagement.dto.gym.GymImgRespDto;
import com.portfolio.healthmanagement.dto.gym.RegisterGymReqDto;
import com.portfolio.healthmanagement.dto.gym.LikeListRespDto;
import com.portfolio.healthmanagement.dto.gym.SearchGymReqDto;
import com.portfolio.healthmanagement.dto.gym.SearchGymRespDto;
import com.portfolio.healthmanagement.entity.Gym;
import com.portfolio.healthmanagement.entity.GymImgs;
import com.portfolio.healthmanagement.entity.GymImgsDetail;
import com.portfolio.healthmanagement.entity.GymOwner;
import com.portfolio.healthmanagement.entity.User;
import com.portfolio.healthmanagement.exception.CustomException;
import com.portfolio.healthmanagement.exception.ErrorMap;
import com.portfolio.healthmanagement.repository.GymRepository;
import com.portfolio.healthmanagement.repository.UserRepository;
import com.portfolio.healthmanagement.security.PrincipalUserDetails;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class GymService {
	
	@Value("${file.path}")
	private String filePath;
	private final GymRepository gymRepository;
	private final UserRepository userRepositiory;
	
	public GetGymRespDto getGym(int gymId) {
		return gymRepository.getGym(gymId).toGetGymDto();
	}
	
	public Map<String, Object> searchGyms(SearchGymReqDto searchGymReqDto){
		List<SearchGymRespDto> list = new ArrayList<>();
		
		int index = (searchGymReqDto.getPage() - 1) * 20;
		Map<String, Object> map = new HashMap<>();
		map.put("index", index);
		map.put("searchValue", searchGymReqDto.getSearchValue());
		
		gymRepository.searchGyms(map).forEach(gym -> {
			list.add(gym.toDto());
		});
		
		int totalCount = gymRepository.getTotalCount(map);
		
		Map<String, Object> responseMap = new HashMap<>();
		
		responseMap.put("totalCount", totalCount);
		responseMap.put("gymList", list);
		
		return responseMap;
	}
	
	public int addGym(RegisterGymReqDto registerGymReqDto) {

		Gym gym = registerGymReqDto.toEntity();
		
		if(gymRepository.findByBusinessNumber(registerGymReqDto.getBusinessNumber()) != null) {
			throw new CustomException("BusinessNumber",ErrorMap.builder().put("BusinessNumber","다시 한번 확인해보세요").build() );
		}
		
		gymRepository.saveGym(gym);
		
		PrincipalUserDetails principalUserDetails = (PrincipalUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		
		GymOwner gymOwner = GymOwner.builder().userId(principalUserDetails.getUserId()).gymId(gym.getGymId()).build();
		gymRepository.saveGymOwner(gymOwner);
		return gym.getGymId();
	}

	public int getLikeCount(int gymId) {
		return gymRepository.getLikeCount(gymId);
	}
	
	public int getLikeStatus(int gymId, int userId) {
		Map<String, Object> map = new HashMap<>();
		map.put("gymId", gymId);
		map.put("userId", userId);
		
		return gymRepository.getLikeStatus(map);
	}
	
	
	
	public Map<String, Object> nearbyGymAddressesAndGymName(String myAddress) {
		List<GetGymAddressAndGymNameRespDto> list = new ArrayList<>();
		Map<String, Object> map = new HashMap<>();
		map.put("myAddress", myAddress);
		
		gymRepository.nearbyGymAddressesAndGymName(map).forEach(gym -> {
			list.add(gym.toGymAddressAndNameDto());
		});
		
		Map<String, Object> responseMap = new HashMap<>();
		responseMap.put("gymData",list);
		
		return responseMap;
		
	}
	
	public int registerGymImgs(RegisterGymImgsReqDto gymImgsReqDto) {
		GymImgs gymImgs = gymImgsReqDto.toEntity();
		
		return gymRepository.registerGymImgsDetail(uploadFile(gymImgs.getGymId(),gymImgs.getPostsId(),gymImgsReqDto.getImgFiles()));
	}
	
	public List<GymImgsDetail> uploadFile(int gymId, int postsId, List<MultipartFile> files){
		if(files == null) {
			return null;
		}
		List<GymImgsDetail> imgFiles = new ArrayList<>();
		
		files.forEach(file-> {
			String originFileName = file.getOriginalFilename();
			String extension = originFileName.substring(originFileName.lastIndexOf("."));
			String tempFileName = UUID.randomUUID().toString().replaceAll("-", "") + extension;
			
			Path uploadPath = Paths.get(filePath + "post/" + tempFileName);
			
			File f = new File(filePath + "post");
			
			if(!f.exists()) {
				f.mkdirs();
			}
			
			try {
				Files.write(uploadPath, file.getBytes());
			} catch (IOException e) {
				e.printStackTrace();
			} 
			
			imgFiles.add(GymImgsDetail.builder()
					.postsId(postsId)
					.originName(originFileName)
					.tempName(tempFileName)
					.gymId(gymId)
					.tempName(tempFileName)
					.imgSize(Long.toString(file.getSize()))
					.build());

		});
		return imgFiles;
	}
	
	public List<GymImgRespDto> getImg(int gymId) {
		List<GymImgRespDto> list = new ArrayList<>();
		
		gymRepository.getImgs(gymId).forEach(gymImg -> {
			list.add(gymImg.toDto());
		});
		
		return list;
	}

}
