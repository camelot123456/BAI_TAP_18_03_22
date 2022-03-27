package com.itdragon.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "[items]")
public class ItemsEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "[quantity]", columnDefinition = "int")
	private Integer quantity;
	
	@Column(name = "[description]", columnDefinition = "nvarchar(max)")
	private String description;
	
	@ManyToOne
	@JoinColumn(name = "[id_product]")
	private ProductEntity product;
	
	@ManyToOne
	@JoinColumn(name = "[id_order]")
	private OrderEntity order;
}
