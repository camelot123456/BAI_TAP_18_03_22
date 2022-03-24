package com.itdragon.security;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.itdragon.entity.RoleEntity;
import com.itdragon.entity.UserEntity;
import com.itdragon.repository.IRoleRepository;
import com.itdragon.repository.IUserRepository;

@Service
public class CustomUserDetailService implements UserDetailsService {

	@Autowired
	private IUserRepository userRepo;
	
	@Autowired
	private IRoleRepository roleRepo;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		UserEntity user = userRepo.findByUsername(username);
		if (user == null) {
			throw new UsernameNotFoundException("User not found in database");
		}
		if (!user.getEnabled()) {
			return null;
		}
		
		List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
		
		for (RoleEntity role : roleRepo.findAllByIdUser(user.getId())) {
			authorities.add(new SimpleGrantedAuthority("ROLE_" + role.getCode()));
		}
		
		return UserPrincipal.createUserPrincipal(
				user.getId(), 
				user.getName(), 
				user.getUsername(), 
				user.getPassword(), 
				authorities);
	}

}
