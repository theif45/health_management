package com.portfolio.healthmanagement.dto.posts;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.portfolio.healthmanagement.entity.Posts;
import com.portfolio.healthmanagement.entity.PostsImg;

import lombok.Data;


@Data
public class RegisterPostsReqDto {
	private int gymId;
	private List<MultipartFile> imgFiles;

}
