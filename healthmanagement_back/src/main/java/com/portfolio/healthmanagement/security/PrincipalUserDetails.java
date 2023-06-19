package com.portfolio.healthmanagement.security;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.portfolio.healthmanagement.entity.Authority;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PrincipalUserDetails implements UserDetails{

	private static final long serialVersionUID = -9056445804731250446L;

	private int userId; 
	private String username;
	private String password;
	private String email;
	private String profile;
	private List<Authority> authorities;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		List<SimpleGrantedAuthority> authorities = new ArrayList<>();
		this.authorities.forEach(authority -> {
			authorities.add(new SimpleGrantedAuthority(authority.getRole().getRoleName()));
		});
		
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
