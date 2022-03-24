package com.itdragon.service;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;

import com.itdragon.entity.UserEntity;
import com.itdragon.payload.UsersCustomPayload;

public interface IUserService {

	public List<UserEntity> findAll(Authentication authentication);
	
	public UserEntity save(UserEntity user);
	
	public List<UsersCustomPayload> findUserAndRolesByIdUser(Long idUser);
	
	public UserEntity update(UserEntity user);
	
	public HttpStatus deleteById(Long id, Authentication authentication);
	
}
