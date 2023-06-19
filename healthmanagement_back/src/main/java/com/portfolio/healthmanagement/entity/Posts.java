package com.portfolio.healthmanagement.entity;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class Posts {
	private int postsId;
	private int userId;
	private String imgSize;
	
	private List<PostsImg> postsFile;
}
