package com.sht.security.service;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import com.sht.security.User;

@Component
public class AuthenticationService {

	public User getUser() {
		try {
			Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
			if ( !(authentication instanceof AnonymousAuthenticationToken) ) {
				return (User) authentication.getPrincipal();
			}
		} catch (AuthenticationException e) {
			e.printStackTrace();
		}

		return null;
	}

	public User getUser(Authentication authentication) {

		if ( !(authentication instanceof AnonymousAuthenticationToken) ) {
			return (User) authentication.getPrincipal();
		}

		return null;
	}
}
