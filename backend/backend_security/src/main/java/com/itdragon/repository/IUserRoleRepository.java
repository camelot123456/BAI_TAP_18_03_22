package com.itdragon.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itdragon.entity.UserRoleEntity;

public interface IUserRoleRepository extends JpaRepository<UserRoleEntity, Long>{
	
}
