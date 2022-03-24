package com.itdragon.security;

import java.util.Date;
import java.util.stream.Collectors;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

public class TokenProvider {

	public static String createToken(Authentication authentication) {
		UserPrincipal principal = (UserPrincipal) authentication.getPrincipal();
		
		Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
		
		return JWT.create()
				.withSubject(principal.getUsername())
				.withClaim("roles", principal.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()))
				.withIssuedAt(new Date())
				.withExpiresAt(new Date(System.currentTimeMillis() + 1000*60*60*60))
				.sign(algorithm);
	}
	
}
