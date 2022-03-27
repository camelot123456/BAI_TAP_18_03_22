package com.itdragon.entity;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "[invoicers]")
public class InvoicerEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "[given_name]", columnDefinition = "nvarchar(30)")
	private String givenName;
	
	@Column(name = "[surname]", columnDefinition = "nvarchar(30)")
	private String surname;
	
	@Column(name = "[address_line_1]", columnDefinition = "nvarchar(255)")
	private String addressLine1;
	
	@Column(name = "[address_line_2]", columnDefinition = "nvarchar(255)")
	private String addressLine2;
	
	@Column(name = "[admin_area_1]", columnDefinition = "nvarchar(255)")
	private String adminArea1;
	
	@Column(name = "[admin_area_2]", columnDefinition = "nvarchar(255)")
	private String adminArea2;
	
	@Column(name = "[postal_code]", columnDefinition = "char(5)")
	private String postalCode;
	
	@Column(name = "[country_code_address]", columnDefinition = "varchar(10)")
	private String countryCodeAddress;
	
	@Column(name = "[email_address]", columnDefinition = "varchar(330)")
	private String emailAddress;
	
	@Column(name = "[website]", columnDefinition = "varchar(255)")
	private String website;
	
	@Column(name = "[tax_id]", columnDefinition = "varchar(255)")
	private String taxId;
	
	@Column(name = "[logo_url]", columnDefinition = "varchar(255)")
	private String logoUrl;
	
	@Column(name = "[additional_notes]", columnDefinition = "varchar(255)")
	private String additionalNotes;

//	------------------------------- Relationship -----------------------------------	
	
	@OneToMany
	private List<PhonesEntity> phones;
	
}
