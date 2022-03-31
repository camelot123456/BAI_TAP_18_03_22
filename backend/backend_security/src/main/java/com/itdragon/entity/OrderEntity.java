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
	private Long id;
	
	@Column(name = "[order_id]", columnDefinition = "varchar(255)")
	private String idOrder;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "[intent]")
	private EOrderIntent intent;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "[status]")
	private EOrderState status;
	
	@Column(name = "[create_time]", columnDefinition = "datetime")
	private Date createTime;

	@Column(name = "[total_item]", columnDefinition = "float")
	private Double total;
	
	@Column(name = "[currency_code]", columnDefinition = "char(3)")
	private String currencyCode;
	
	@Column(name = "[final_capture]", columnDefinition = "bit default 0")
	private Boolean finalCapture;
	
	@Column(name = "[received]", columnDefinition = "bit default 0")
	private Boolean received;
	
//	------------------------------- purchase_units -----------------------------------
	
	@Column(name = "[reference_id]", columnDefinition = "varchar(256)")
	private String referenceId;
	
	@Column(name = "[shipping_full_name]", columnDefinition = "nvarchar(300)")
	private String nameShippingCus;
	
	@Column(name = "[address_line_1]", columnDefinition = "nvarchar(300)")
	private String addLine1Cus;
	
	@Column(name = "[address_line_2]", columnDefinition = "nvarchar(300)")
	private String addLine2Cus;
	
	@Column(name = "[admin_area_1]", columnDefinition = "nvarchar(300)")
	private String adArea1;
	
	@Column(name = "[admin_area_2]", columnDefinition = "nvarchar(120)")
	private String adArea2;
	
	@Column(name = "[postal_code]", columnDefinition = "varchar(60)")
	private String posCode;
	
	@Column(name = "[country_code]", columnDefinition = "char(2)")
	private String couCode;
	
//	------------------------------- payment authorizations -----------------------------------
	
	@Column(name = "[pay_auth_status]", columnDefinition = "varchar(30)")
	private String payAuthStatus;
	
	@Column(name = "[pay_auth_id]", columnDefinition = "varchar(256)")
	private String payAuthId;
	
	@Column(name = "[pay_auth_amount]", columnDefinition = "float")
	private Double payAuthAmount;
	
	@Column(name = "[pay_auth_cre_time]", columnDefinition = "datetime")
	private Date payAuthCreTime;
	
	@Column(name = "[pay_auth_upd_time]", columnDefinition = "datetime")
	private Date payAuthUpdTime;
	
	@Column(name = "[gross_amount]", columnDefinition = "float")
	private Double payAuthGrossAmount;
	
	@Column(name = "[paypal_fee]", columnDefinition = "float")
	private Double payAuthPaypalFee;
	
	@Column(name = "[net_amount]", columnDefinition = "float")
	private Double payAuthNetAmount;
	
//	------------------------------- Refunds -----------------------------------
	
	@Column(name = "[id_refund]", columnDefinition = "varchar(256)")
	private String idRefund;
	
	@Column(name = "[gross_amount_refunded]", columnDefinition = "float")
	private Double grossAmountRefund;
	
	@Column(name = "[paypal_fee_refunded]", columnDefinition = "float")
	private Double paypalFeeRefund;
	
	@Column(name = "[net_amount_refund]", columnDefinition = "float")
	private Double netAmountRefund;
	
	@Column(name = "[create_time_refund]", columnDefinition = "datetime")
	private Date createTimeRefund;
	
	@Column(name = "[update_time_refund]", columnDefinition = "datetime")
	private Date updateTimeRefund;

	@Column(name = "[note_to_payer]", columnDefinition = "nvarchar(512)")
	private String noteRefund;
	
	@Column(name = "[status_refund]", columnDefinition = "nvarchar(512)")
	private String statusRefund;
	
	@Column(name = "[total_refunded_amount]", columnDefinition = "float")
	private Double totalRefundedAmount;
		
//	------------------------------- payer -----------------------------------	
	
	@Column(name = "given_name_payer", columnDefinition = "nvarchar(140)")
	private String givenNamePayer;
	
	@Column(name = "surname_payer", columnDefinition = "nvarchar(140)")
	private String surnamePayer;
	
	@Column(name = "email_payer", columnDefinition = "varchar(254)")
	private String emailPayer;
	
	@Column(name = "id_payer", columnDefinition = "varchar(13)")
	private String idPayer;
	
	@Column(name = "[country_code_payer]", columnDefinition = "char(2)")
	private String couCodePayer;
	
//	------------------------------- relationship -----------------------------------	
	
	@ManyToOne
	@JoinColumn(name = "[id_user]")
	@JsonBackReference("user-order")
	private UserEntity user;
	
	@OneToMany(mappedBy = "order") 
	@JsonManagedReference("order-items")
	private List<ItemsEntity> items;
	
//	------------------------------- transient -----------------------------------		


}
