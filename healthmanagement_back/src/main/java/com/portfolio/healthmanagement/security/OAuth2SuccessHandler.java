package com.portfolio.healthmanagement.security;

import java.io.IOException;
import java.net.URLEncoder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import com.portfolio.healthmanagement.entity.User;
import com.portfolio.healthmanagement.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class OAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	
	private final UserRepository userRepository;
	private final JwtTokenProvider jwtTokenProvider;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
		String email = oAuth2User.getAttribute("email");
		String name = oAuth2User.getAttribute("name");
		String provider = oAuth2User.getAttribute("provider");
		User userEntity = userRepository.findUserByEmail(email);

		// 회원가입이 안되어 있을 경우
		if(userEntity == null) {
			String registerToken = jwtTokenProvider.generateOAuth2RegisterToken(authentication);
			response.sendRedirect("http://localhost:3000/auth/oauth2/register?"
									+ "registerToken=" + registerToken
									+ "&email=" + email
									+ "&name=" + URLEncoder.encode(name,"UTF-8")
									+ "&provider=" + provider);
		// 회원가입 되어 있을 경우
		} else {
			// 회원가입 되어 있고, provider가 등록된 경우
			if (StringUtils.hasText(userEntity.getProvider())){
				// 회원가입 되어 있고, provider가 등록되어 있지만 로그인된 oauth2의 계정의 provider가 등록 안되 있는 경우
				if(!userEntity.getProvider().contains(provider)) {
					response.sendRedirect("http://localhost:3000/auth/oauth2/merge?"
											+ "provider=" + provider
											+ "&email=" + email);
					return;
				}
				// 회원가입 되어 있고, 로그인된 oauth2의 계정의 provider가 등록되어 있을 경우
				response.sendRedirect("http://localhost:3000/auth/oauth2/login?"
										+ "accessToken=" + jwtTokenProvider.generateAccessToken(authentication));
			// 회원가입은 되어 있고, provider가 null인 경우
			} else {
				response.sendRedirect("http://localhost:3000/auth/oauth2/merge?"
						+ "provider=" + provider
						+ "&email=" + email);
			}
		}
		
	}
}
