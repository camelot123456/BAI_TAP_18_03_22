package com.itdragon.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "[roles]")
public class RoleEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "[code]", columnDefinition = "varchar(64) not null unique")
	private String code;
	
	@Column(name = "[rank]", columnDefinition = "int not null unique")
	private Integer rank;
	
	@OneToMany(mappedBy = "role", fetch = FetchType.LAZY)
	@JsonManagedReference("role-user_role")
	private List<UserRoleEntity> userRoleArr;
	
}
