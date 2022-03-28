package com.itdragon.service.impl;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itdragon.entity.CartEntity;
import com.itdragon.entity.ProductCart;
import com.itdragon.entity.ProductEntity;
import com.itdragon.entity.UserEntity;
import com.itdragon.payload.ProductCartPayload;
import com.itdragon.payload.ProductPayload;
import com.itdragon.repository.ICartRepository;
import com.itdragon.repository.IProductCartRepository;
import com.itdragon.repository.IProductRepository;
import com.itdragon.repository.IUserRepository;
import com.itdragon.service.ICartService;
import com.itdragon.service.IProductCartService;

@Service
public class ProductCartService implements IProductCartService {

	@Autowired
	private IUserRepository userRepo;
	
	@Autowired
	private IProductRepository productRepo;
	
	@Autowired
	private ICartService cartServ;
	
	@Autowired
	private ICartRepository cartRepo;
	
	@Autowired
	private IProductCartRepository pdRepo;
	
	@Override
	public void addProductIntoCart(ProductCartPayload payload) {
		// TODO Auto-generated method stub
		UserEntity user = userRepo.findByUsername(payload.getUsername());
		ProductEntity product = productRepo.findById(payload.getIdProduct()).get();
		ProductCart pc = new ProductCart();
		
//		Kiểm tra giỏ hàng của user đã tạo chưa, nếu chưa thì tạo mới giỏ hàng
		if (user.getCarts().stream().count() == 0) {
			CartEntity cartNew = cartServ.createCart(user.getId());
			pc.setCart(cartNew);
			pc.setProduct(product);
			pc.setQuantity(payload.getQuantity());
			pc.setPrice(pc.getQuantity() * product.getPrice());
			pdRepo.save(pc);
			return;
		}
				
//		Nếu giỏ hàng đã tồn tại thì không cần tạo nữa
		CartEntity cart = cartRepo.findById(payload.getIdCart() == null ? user.getCarts().get(0).getId() : payload.getIdCart()).get();
		for (ProductCart productCart : cart.getProductCartArr()) {
			
//			nếu giỏ hàng đã tồn tại sản phẩm đó rồi, thì chỉ cần cập nhập lại số lượng của sản phẩm đó
			if (productCart.getProduct().getId() == payload.getIdProduct()) {
				productCart.setQuantity(productCart.getQuantity() + payload.getQuantity());
				productCart.setPrice(productCart.getQuantity() * product.getPrice());
				pdRepo.save(productCart);
				return;
			}
		}
		pc.setCart(cart);
		pc.setProduct(product);
		pc.setQuantity(payload.getQuantity());
		pc.setPrice(pc.getQuantity() * product.getPrice());
		pdRepo.save(pc);
	}

	@Override
	public List<ProductPayload> findAllByUsername(String username) {
		// TODO Auto-generated method stub
		 List<Object[]> records = pdRepo.findAllByUsername(username);
		 List<ProductPayload> productPayloads = null;
		 if (records.size() > 0) {
			productPayloads = new ArrayList<ProductPayload>();
			for (Object[] record : records) {
				ProductPayload pp = new ProductPayload();
				pp.setIdProductCart((BigInteger) record[0]);
				pp.setNameProduct((String) record[1]);
				pp.setPriceProduct((Double) record[2]);
				pp.setAvatarUrl((String) record[3]);
				pp.setQuantity((Integer) record[4]);
				pp.setTotalPrice((Double) record[5]);
				
				productPayloads.add(pp);
			}
		}
		 return productPayloads;
	}

	@Override
	public void deleteById(Long idProductCart) {
		// TODO Auto-generated method stub
		pdRepo.deleteById(idProductCart);
	}

}
