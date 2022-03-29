package com.itdragon.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonBackReference;

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
	
	@Column(name = "[price]", columnDefinition = "float")
	private Double price;
	
	@ManyToOne
	@JoinColumn(name = "id_product")
	@JsonBackReference("product-items")
	private ProductEntity product;
	
	@ManyToOne
	@JoinColumn(name = "id_order")
	@JsonBackReference("order-items")
	private OrderEntity order;
	
	@Transient
	private Long idProduct;
	
	@Transient
	private Long idOrder;
	
}
