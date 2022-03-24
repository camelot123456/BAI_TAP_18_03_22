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
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "[users]")
public class UserEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "[name]")
	private String name;
	
	@Column(name = "[username]", unique = true)
	private String username;
	
	@Column(name = "[email]", columnDefinition = "varchar(320) not null unique")
	private String email;
	
	@Column(name = "[enabled]", columnDefinition = "bit")
	private Boolean enabled;
	
	@Column(name = "[otp_code]", columnDefinition = "char(64)")
	private String otpCode;
	
	@Column(name = "[password]")
	private String password;
	
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
	@JsonManagedReference("user")
	private List<UserRoleEntity> userRoleArr;
	
//	Transient
	
	@Transient
	private Long[] idRoles;
	
}
