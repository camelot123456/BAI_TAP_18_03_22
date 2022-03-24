package com.itdragon.service;

import java.util.List;

import com.itdragon.entity.RoleEntity;

public interface IRoleService {

	public List<RoleEntity> findAll();
	
	public RoleEntity save(RoleEntity role);
	
	public RoleEntity update(RoleEntity role);
	
	public void deleteById(Long id);
	
}
