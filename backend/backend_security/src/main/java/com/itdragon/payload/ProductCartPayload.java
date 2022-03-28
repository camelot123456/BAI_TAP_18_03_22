package com.itdragon.payload;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductCartPayload {

	private String username;
	private Long idProduct;
	private Long idCart;
	private Integer quantity;
	
}
