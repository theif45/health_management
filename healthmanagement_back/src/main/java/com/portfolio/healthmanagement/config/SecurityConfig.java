package com.portfolio.healthmanagement.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.portfolio.healthmanagement.security.JwtAuthenticationEntryPoint;
import com.portfolio.healthmanagement.security.JwtAuthenticationFilter;
import com.portfolio.healthmanagement.security.JwtTokenProvider;
import com.portfolio.healthmanagement.security.OAuth2SuccessHandler;
import com.portfolio.healthmanagement.service.AuthenticationService;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	private final JwtTokenProvider jwtTokenProvider;
	private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
	private final AuthenticationService authenticationService;
	private final OAuth2SuccessHandler oAuth2SuccessHandler;
	
	
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors();
		http.csrf().disable();
		http.httpBasic().disable();
		http.formLogin().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS); 
		http.authorizeRequests()
		.antMatchers("/auth/**", "/image/**", "/mail/**","/admin/login")
		.permitAll()
		.anyRequest()
		.authenticated()
		.and()
		.addFilterBefore(new JwtAuthenticationFilter(jwtTokenProvider), UsernamePasswordAuthenticationFilter.class) //필터에서 UsernamePasswordAuthenticationFilter 검사함
		.exceptionHandling()
		.authenticationEntryPoint(jwtAuthenticationEntryPoint)
		.and()
		.oauth2Login()
		.loginPage("http://localhost:3000/auth/login")
		.successHandler(oAuth2SuccessHandler)
		.userInfoEndpoint()
		.userService(authenticationService);
	}
}
