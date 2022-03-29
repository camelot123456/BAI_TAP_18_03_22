package com.itdragon.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.itdragon.entity.ProductCart;

public interface IProductCartRepository extends JpaRepository<ProductCart, Long>{

	@Query(value = "select pc.id as id_pc, p.[name] as name_p, p.price as price_p, p.avatar_url, pc.quantity, pc.price as price_pc, p.id as id_p "
			+ "from products p inner join product_cart pc "
			+ "on p.id = pc.id_product inner join carts c "
			+ "on c.id = pc.id_cart inner join users u "
			+ "on c.id_user = u.id "
			+ "where u.username = ?1", 
			nativeQuery = true)
	public List<Object[]> findAllByUsername(String username);
	
}
