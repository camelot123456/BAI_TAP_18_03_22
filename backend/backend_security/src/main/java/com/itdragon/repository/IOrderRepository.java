package com.itdragon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.itdragon.entity.OrderEntity;

public interface IOrderRepository extends JpaRepository<OrderEntity, Long>{

	@Query(value = "select o.* from orders o where o.order_id = ?1 and o.id_payer = ?2", nativeQuery = true)
	public OrderEntity findByIdOrderAndIdPayer(String idOrder, String idPayer);
	
}
