package com.itdragon.service.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.itdragon.entity.RoleEntity;
import com.itdragon.entity.UserEntity;
import com.itdragon.payload.UsersCustomPayload;
import com.itdragon.repository.IRoleRepository;
import com.itdragon.repository.IUserRepository;
import com.itdragon.repository.IUserRoleRepository;
import com.itdragon.service.IUserRoleService;
import com.itdragon.service.IUserService;

@Service
public class UserService implements IUserService{

	@Autowired
	private IUserRepository userRepo;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private IUserRoleRepository userRoleRepo;
	
	@Autowired
	private IUserRoleService userRoleServ;
	
	@Autowired
	private IRoleRepository roleRepo;
	
	
	@Override
	public List<UserEntity> findAll(Authentication authentication) {
		// TODO Auto-generated method stub
		UserEntity user = userRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		List<RoleEntity> roles = user.getUserRoleArr().stream().map(ur -> ur.getRole()).collect(Collectors.toList());
		RoleEntity roleMinRank = roles.stream().min(Comparator.comparing(RoleEntity::getRank)).get();
		return userRepo.findAllByRankRole(roleMinRank.getRank(), user.getId());
	}

	@Override
	public UserEntity save(UserEntity user) {
		// TODO Auto-generated method stub
		if (user.getUsername() != null && !userRepo.existsByUsername(user.getUsername())) {
			user.setPassword(passwordEncoder.encode(user.getPassword()));
			UserEntity userNew = userRepo.save(user);
			userRoleServ.addUserToRole(
					userNew.getId(), 
					new Long[]{roleRepo.findByCode("USER").getId()}
				);
			return userNew;
		}
		return null;
	}

	@Transactional
	@Override
	public UserEntity update(UserEntity user) {
		// TODO Auto-generated method stub
		if (userRepo.existsById(user.getId())) {
			UserEntity userNew = userRepo.findById(user.getId()).get();
			userNew.getUserRoleArr().stream().forEach(ur -> userRoleRepo.deleteById(ur.getId()));
			userNew.setName(user.getName());
			userNew.setPassword(passwordEncoder.encode(user.getPassword()));
			UserEntity userUpdate = userRepo.save(userNew);
			
			userRoleServ.addUserToRole(userUpdate.getId(), user.getIdRoles());
			return userUpdate;
		}
		return null;
	}

	@Override
	public HttpStatus deleteById(Long id, Authentication authentication) {
		// TODO Auto-generated method stub
		UserEntity user = userRepo.findByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
		List<RoleEntity> roles = user.getUserRoleArr().stream().map(ur -> ur.getRole()).collect(Collectors.toList());
		RoleEntity roleMinRank = roles.stream().min(Comparator.comparing(RoleEntity::getRank)).get();
		
		UserEntity userDelete = userRepo.findById(id).get();
		
		Boolean checkedRank = userDelete.getUserRoleArr().stream()
		.map(ur -> ur.getRole()).anyMatch(r -> r.getRank() > roleMinRank.getRank());
		if (checkedRank) {
			userDelete.getUserRoleArr().stream().forEach(ur -> userRoleRepo.deleteById(ur.getId()));
			userRepo.deleteById(id);
			return HttpStatus.OK;
		}
		return HttpStatus.FORBIDDEN;
	}

	@Override
	public List<UsersCustomPayload> findUserAndRolesByIdUser(Long idUser) {
		// TODO Auto-generated method stub
		List<Object[]> records = userRepo.findUserAndRolesByIdUser(idUser);
		List<UsersCustomPayload> users = null;
		if (records.size() > 0) {
			users = new ArrayList<UsersCustomPayload>();
			for (Object[] record : records) {
				UsersCustomPayload u = new UsersCustomPayload();
				u.setIdUser((BigInteger) record[0]);
				u.setName((String) record[1]);
				u.setUsername((String) record[2]);
				u.setIdRole((BigInteger) record[3]);
				u.setCode((String) record[4]);
				users.add(u);
			}
		}
		return users;
	}

}
