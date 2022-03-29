package com.itdragon.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.itdragon.entity.ItemsEntity;

public interface IItemRepository extends JpaRepository<ItemsEntity, Long>{

	@Query(value = "select i.id as id_i, i.quantity,i.price as price_i , p.[name] as name_p, p.price as price_p, p.avatar_url, p.id as id_p "
			+ "from products p inner join items i "
			+ "on p.id = i.id_product inner join orders o "
			+ "on o.id = i.id_order where o.id = ?1", nativeQuery = true)
	public List<Object[]> findAllByIdOrder(Long idOrder);
	
}
