package com.itdragon.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "[carts]")
public class CartEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@CreatedDate
	@Column(name = "[created_at]", columnDefinition = "datetime")
	private Date createdAt;
	
	@CreatedDate
	@Column(name = "[modified_at]", columnDefinition = "datetime")
	private Date modifiedAt;
	
	@Column(name = "[total_quantity]", columnDefinition = "int")
	private int totalQuantity;
	
	@Column(name = "[total_price]", columnDefinition = "float")
	private Double totalPrice;
	
	@ManyToOne
	@JoinColumn(name = "id_user")
	@JsonBackReference("user-cart")
	private UserEntity user;
	
	@OneToMany(mappedBy = "cart")
	@JsonManagedReference("cart-product_cart")
	private List<ProductCart> productCartArr;
}
