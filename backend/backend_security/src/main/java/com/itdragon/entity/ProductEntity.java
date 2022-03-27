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
//@Entity
//@Table(name = "[products]")
public class ProductEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	
	@Column(name = "[name]", columnDefinition = "nvarchar(256)")
	private String name;
	
	@Column(name = "[avatar_url]", columnDefinition = "nvarchar(256)")
	private String avatarUrl;
	
	@Column(name = "[stock]", columnDefinition = "int")
	private Integer stock;

	@Column(name = "[price]", columnDefinition = "float")
	private Double price;
	
	@Column(name = "[currency_code]", columnDefinition = "char(3)")
	private String currencyCode;
	
	
	@OneToMany
	private List<ItemsEntity> items;
}
