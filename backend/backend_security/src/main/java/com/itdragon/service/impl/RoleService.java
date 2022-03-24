package com.itdragon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itdragon.entity.RoleEntity;
import com.itdragon.repository.IRoleRepository;
import com.itdragon.service.IRoleService;

@Service
public class RoleService implements IRoleService{

	@Autowired
	private IRoleRepository roleRepo;
	
	@Override
	public List<RoleEntity> findAll() {
		// TODO Auto-generated method stub
		return roleRepo.findAll();
	}

	@Override
	public RoleEntity save(RoleEntity role) {
		// TODO Auto-generated method stub
		return roleRepo.save(role);
	}

	@Override
	public RoleEntity update(RoleEntity role) {
		// TODO Auto-generated method stub
		if (roleRepo.existsById(role.getId())) {
			return roleRepo.save(role);
		}
		return null;
	}

	@Override
	public void deleteById(Long id) {
		// TODO Auto-generated method stub
		roleRepo.deleteById(id);
	}

}
