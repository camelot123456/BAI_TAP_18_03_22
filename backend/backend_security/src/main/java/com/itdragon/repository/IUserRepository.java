package com.itdragon.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.itdragon.entity.UserEntity;

public interface IUserRepository extends JpaRepository<UserEntity, Long>{
	
	public UserEntity findByUsername(String username);
	
	public Boolean existsByUsername(String username);
	
	public Boolean existsByOtpCode(String otpCode);
	
	public Optional<UserEntity> findByOtpCode(String otpCode);
	
	@Query(value = "select u.id as idUser, u.[name], u.username, r.id as idRole, r.code, "
			+ "u.password "
			+ "from users u left join user_role ur "
			+ "on u.id = ur.id_user left join roles r "
			+ "on ur.id_role = r.id "
			+ "where u.id = ?1",
			nativeQuery = true)
	public List<Object[]> findUserAndRolesByIdUser(Long idUser);
	
	@Query(value = "select distinct u.* "
			+ "from users u left join user_role ur "
			+ "on u.id = ur.id_user left join roles r "
			+ "on ur.id_role = r.id "
			+ "where r.rank >= ?1 and u.id not in (?2)",
			nativeQuery = true)
	public List<UserEntity> findAllByRankRole(Integer rank, Long idUser);
}
