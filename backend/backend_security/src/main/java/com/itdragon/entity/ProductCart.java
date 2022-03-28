package com.itdragon.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonBackReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "[product_cart]")
public class ProductCart {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "[quantity]", columnDefinition = "int")
	private Integer quantity;
	
	@Column(name = "[price]", columnDefinition = "float")
	private Double price;
	
	@ManyToOne
	@JoinColumn(name = "id_product")
	@JsonBackReference("product-product_cart")
	private ProductEntity product;
	
	@ManyToOne
	@JoinColumn(name = "id_cart")
	@JsonBackReference("cart-product_cart")
	private CartEntity cart;
}
