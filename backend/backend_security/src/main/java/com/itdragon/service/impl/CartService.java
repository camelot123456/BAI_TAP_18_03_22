package com.itdragon.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.itdragon.entity.CartEntity;
import com.itdragon.entity.ProductCart;
import com.itdragon.entity.UserEntity;
import com.itdragon.repository.ICartRepository;
import com.itdragon.repository.IUserRepository;
import com.itdragon.service.ICartService;

@Service
public class CartService implements ICartService{

	@Autowired
	private ICartRepository cartRepo;
	
	@Autowired
	private IUserRepository userRepo;
	
	@Override
	public CartEntity createCart(Long idUser) {
		// TODO Auto-generated method stub
		UserEntity user = userRepo.findById(idUser).get();
		
		if (user == null) {
			throw new ResponseStatusException(HttpStatus.METHOD_NOT_ALLOWED);
		}
		CartEntity cart = new CartEntity();
		cart.setUser(user);
		
		return cartRepo.save(cart);
	}

	@Override
	public int countQuantityProduct(String username) {
		// TODO Auto-generated method stub
		UserEntity user = userRepo.findByUsername(username);
		int res = 0;
		try {
			for (ProductCart pc : user.getCarts().get(0).getProductCartArr()) {
				res += pc.getQuantity();
			}
			return res;
		} catch (NullPointerException e) {
			// TODO: handle exception
			return 0;
		}
	}

}
