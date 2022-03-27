package com.itdragon.entity;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.itdragon.entity.enums.EOrderIntent;
import com.itdragon.entity.enums.EOrderState;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
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
	
//	------------------------------- amount -----------------------------------
	
	@Column(name = "[tax_total]", columnDefinition = "varchar(255)")
	private Double taxTotal;
	
	@Column(name = "[due_amount]", columnDefinition = "float")
	private Double dueAmount;
	
	@Column(name = "[item_total]", columnDefinition = "float")
	private Double itemTotal;
	
	@Column(name = "[custom_label]", columnDefinition = "nvarchar(255)")
	private String customLabel;
	
	@Column(name = "[custom_total]", columnDefinition = "float")
	private Double customTotal;
	
	@Column(name = "[shipping_total]", columnDefinition = "float")
	private Double shippingTotal;
	
	@Column(name = "[shipping_tax_percent]", columnDefinition = "float")
	private Double shippingTaxPercent;
	
	@Column(name = "[shipping_tax_total]", columnDefinition = "float")
	private Double shippingTaxTotal;
	
	@Column(name = "[item_discount]", columnDefinition = "float")
	private Double itemDiscount;
	
	@Column(name = "[invoice_discount_percent]", columnDefinition = "float")
	private Double invoiceDiscountPercent;
	
	@Column(name = "[invoice_discount_total]", columnDefinition = "float")
	private Double invoiceDiscountTotal;
	
//	------------------------------- relationship -----------------------------------	
	
	@OneToOne
	private InvoicerEntity invoicer;
	
	@OneToMany
	private List<PrimaryRecipientsEntity> recipientsEntities;
	
	@OneToMany
	private List<ItemsEntity> items;
	
}
