package com.portfolio.healthmanagement.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.portfolio.healthmanagement.dto.auth.FindPasswordReqDto;
import com.portfolio.healthmanagement.dto.auth.FindUsernameReqDto;
import com.portfolio.healthmanagement.dto.auth.ForgotReqDto;
import com.portfolio.healthmanagement.dto.auth.LoginReqDto;
import com.portfolio.healthmanagement.dto.auth.OAuth2ProviderMergeReqDto;
import com.portfolio.healthmanagement.dto.auth.OAuth2RegisterReqDto;
import com.portfolio.healthmanagement.dto.auth.registerReqDto;
import com.portfolio.healthmanagement.entity.Authority;
import com.portfolio.healthmanagement.entity.User;
import com.portfolio.healthmanagement.exception.CustomException;
import com.portfolio.healthmanagement.exception.ErrorMap;
import com.portfolio.healthmanagement.repository.UserRepository;
import com.portfolio.healthmanagement.security.JwtTokenProvider;
import com.portfolio.healthmanagement.security.OAuth2Attribute;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

	private final UserRepository userRepositiory;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final JwtTokenProvider jwtTokenProvider;

	public void checkDuplicatedUsername(String username) {
		if (userRepositiory.findUserByUsername(username) != null) {
			throw new CustomException("Duplicated Email", ErrorMap.builder().put("username", "가입 된 아이디 입니다.").build());
		}
	}

	public int register(registerReqDto registerReqDto) {

		User userEntity = registerReqDto.toEntity();
		userRepositiory.saveUser(userEntity);

		Authority authority = null;

		if (registerReqDto.getUserType() == 1) {
			authority = Authority.builder().userId(userEntity.getUserId()).roleId(2).build();
		} else {
			authority = Authority.builder().userId(userEntity.getUserId()).roleId(3).build();
		}

		return userRepositiory.saveAuthority(authority);
	}

	public String login(LoginReqDto loginReqDto) {
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(
				loginReqDto.getUsername(), loginReqDto.getPassword());
		Authentication authentication = authenticationManagerBuilder.getObject()
				.authenticate(usernamePasswordAuthenticationToken);

		return jwtTokenProvider.generateAccessToken(authentication);
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User userEntity = userRepositiory.findUserByUsername(username);
		
		
		if (userEntity == null) {
			return null;
		}

		return userEntity.toPrincipal();
	}

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2UserService<OAuth2UserRequest, OAuth2User> oAuth2UserService = new DefaultOAuth2UserService();
		// 모든 oauth의 형식을 같게 만들기 위해 한바퀴 돔
		OAuth2User oAuth2User = oAuth2UserService.loadUser(userRequest);

		String registrationId = userRequest.getClientRegistration().getRegistrationId();
		OAuth2Attribute oAuth2Attribute = OAuth2Attribute.of(registrationId, oAuth2User.getAttributes());
		Map<String, Object> attributes = oAuth2Attribute.convertToMap();

		return new DefaultOAuth2User(Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")), attributes,
				"email");
	}

	public int oauth2Registe(OAuth2RegisterReqDto oAuth2RegisterReqDto) {
		User userEntity = oAuth2RegisterReqDto.toEntity();
		userRepositiory.saveUser(userEntity);

		Authority authority = null;
		if (oAuth2RegisterReqDto.getUserType() == 1) {
			authority = Authority.builder().userId(userEntity.getUserId()).roleId(2).build();
		} else {
			authority = Authority.builder().userId(userEntity.getUserId()).roleId(3).build();
		}

		return userRepositiory.saveAuthority(authority);
	}

	@Override
	public boolean checkPassword(OAuth2ProviderMergeReqDto oAuth2ProviderMergeReqDto) {
		User userEntity = userRepositiory.findUserByEmail(oAuth2ProviderMergeReqDto.getEmail());
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		return passwordEncoder.matches(oAuth2ProviderMergeReqDto.getPassword(), userEntity.getPassword());
	}

	@Override
	public int oauth2ProviderMerge(OAuth2ProviderMergeReqDto oAuth2ProviderMergeReqDto) {
		User userEntity = userRepositiory.findUserByEmail(oAuth2ProviderMergeReqDto.getEmail());
		String provider = oAuth2ProviderMergeReqDto.getProvider();

		if (StringUtils.hasText(userEntity.getProvider())) {
			userEntity.setProvider(userEntity.getProvider() + "," + provider);
		} else {
			userEntity.setProvider(provider);
		}

		return userRepositiory.updateProvider(userEntity);
	}

	@Override
	public String findUsernameByEmailAndName(FindUsernameReqDto findUsernameReqDto) {
		String username = userRepositiory.findUserByEmailAndName(findUsernameReqDto.toEntity());
		if (username == null) {
			throw new CustomException("가입된 정보가 없습니다.");
		} else {
			return username;
		}
	}

	@Override
	public boolean findPasswordByEmailAndNameAndId(FindPasswordReqDto findPasswordReqDto) {
		boolean flag = userRepositiory.findPasswordByEmailAndNameAndUsername(findPasswordReqDto.toEntity()) != 0;
		if (!flag) {
			throw new CustomException("정보를 다시 확인해주세요");
		}

		return flag;
	}

	@Override
	public boolean forgotPassword(ForgotReqDto forgotReqDto) {
		BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
		String password = passwordEncoder.encode(forgotReqDto.getPassword());
		return userRepositiory.forgotPassword(forgotReqDto.getEmail(), password) != false;
		
	}
	

}
