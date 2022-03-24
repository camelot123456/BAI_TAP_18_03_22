package com.itdragon.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.itdragon.entity.RoleEntity;

public interface IRoleRepository extends JpaRepository<RoleEntity, Long>{

	@Query(value = "select r.* "
			+ "from roles r inner join user_role ur "
			+ "on r.id = ur.id_role inner join users u "
			+ "on u.id = ur.id_user "
			+ "where u.id = ?1",
			nativeQuery = true)
	public List<RoleEntity> findAllByIdUser(Long idUser);
	
	public RoleEntity findByCode(String code);
	
}
