package com.itdragon.entity;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "[transactions]")
public class TransactionEntity {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "[type]", columnDefinition = "varchar(32)")
	private String type;
	
	@Column(name = "[payment_id]", columnDefinition = "varchar(32)")
	private String paymentId;
	
	@Column(name = "[transaction_type]", columnDefinition = "varchar(32)")
	private String transactionType;
	
	@Column(name = "[payment_date]", columnDefinition = "datetime")
	private Date paymentDate;
	
	@Column(name = "[currency_code]", columnDefinition = "char(3)")
	private String currencyCode;
	
	@Column(name = "[amount]", columnDefinition = "float")
	private Double amount;
}
