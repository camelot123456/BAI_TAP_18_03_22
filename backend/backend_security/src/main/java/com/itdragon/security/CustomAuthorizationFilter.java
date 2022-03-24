package com.itdragon.security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

public class CustomAuthorizationFilter extends OncePerRequestFilter{

	public static final String KEY_AUTH = "itdragon ";
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		if (request.getRequestURI().startsWith("/pri")) {
			try {
				if (request.getHeader("Authorization").startsWith(KEY_AUTH)
						|| request.getHeader("Authorization") != null) {
						String token = request.getHeader("Authorization").substring(KEY_AUTH.length());
						
						Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
						
						JWTVerifier verifier = JWT.require(algorithm).build();
						DecodedJWT jwt = verifier.verify(token);		
						
						String username = jwt.getSubject();
						String[] roles = jwt.getClaim("roles").asArray(String.class);
						List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
						for (String code : roles) {
							authorities.add(new SimpleGrantedAuthority(code));
						}
						
						UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
								username, null, authorities);			
						SecurityContextHolder.getContext().setAuthentication(authenticationToken);
						
						filterChain.doFilter(request, response);
						return;
					}
					filterChain.doFilter(request, response);
					return;
			} catch (NullPointerException e) {
				// TODO: handle exception
				response.setStatus(HttpStatus.FORBIDDEN.value());
				return;
			}
		}
		filterChain.doFilter(request, response);
		return;
	}

}
