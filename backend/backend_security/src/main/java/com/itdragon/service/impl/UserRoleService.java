package com.itdragon.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itdragon.entity.RoleEntity;
import com.itdragon.entity.UserEntity;
import com.itdragon.entity.UserRoleEntity;
import com.itdragon.repository.IRoleRepository;
import com.itdragon.repository.IUserRepository;
import com.itdragon.repository.IUserRoleRepository;
import com.itdragon.service.IUserRoleService;

@Service
public class UserRoleService implements IUserRoleService{

	@Autowired
	private IUserRoleRepository userRoleRepo;
	
	@Autowired
	private IUserRepository userRepo;
	
	@Autowired
	private IRoleRepository roleRepo;
	
	@Override
	public void addUserToRole(Long id, Long[] ids) {
		// TODO Auto-generated method stub
		UserEntity user = userRepo.findById(id).get();
		for (Long idRole : ids) {
			RoleEntity role = roleRepo.findById(idRole).get();
			UserRoleEntity ure = new UserRoleEntity();
			
			ure.setUser(user);
			ure.setRole(role);
			
			userRoleRepo.save(ure);
		}
	}

}
