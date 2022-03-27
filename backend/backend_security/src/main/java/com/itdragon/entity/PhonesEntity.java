package com.itdragon.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "[phones]")
public class PhonesEntity {

	@Column(name = "[country_code_phone]", columnDefinition = "varchar(5)")
	private String countryCodePhone;
	
	@Column(name = "[national_number]", columnDefinition = "varchar(15)")
	private String nationalNumber;
	
	@Column(name = "[phone_type]", columnDefinition = "varchar(32)")
	private String phoneType;
	
}
