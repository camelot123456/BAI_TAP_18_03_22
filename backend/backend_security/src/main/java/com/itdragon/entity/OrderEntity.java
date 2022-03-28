package com.itdragon.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EntityListeners;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.itdragon.entity.enums.EOrderIntent;
import com.itdragon.entity.enums.EOrderState;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "[orders]")
public class OrderEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private String id;
	
	@Column(name = "[order_id]", columnDefinition = "varchar(255)")
	private String idOrder;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "[intent]")
	private EOrderIntent intent;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "[state]")
	private EOrderState state;
	
	@Column(name = "[create_time]", columnDefinition = "datetime")
	private Date createTime;
	
//	------------------------------- purchase_units -----------------------------------
	
	private String idCus;
	
	private String nameCus;
	
	private String addLine1Cus;
	
	private String addLine2Cus;
	
	private String adArea1;
	
	private String adArea2;
	
	private String posCode;
	
	private String couCode;
	
//	------------------------------- payment authorizations -----------------------------------
	private String payAuthStatus;
	
	private String payAuthId;
	
	private String payAuthAmount;
	
	private Date payAuthExpTime;
	
	private Date payAuthCreTime;
	
	private Date payAuthUpdTime;
		
//	------------------------------- relationship -----------------------------------	
	
	
	@ManyToOne
	@JoinColumn(name = "[id_user]")
	@JsonBackReference("user-order")
	private UserEntity user;
	
	@OneToMany(mappedBy = "order")
	@JsonManagedReference("order-items")
	private List<ItemsEntity> items;
	
}
