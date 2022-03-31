package com.itdragon.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.itdragon.entity.OrderEntity;

public interface IOrderRepository extends JpaRepository<OrderEntity, Long>{

	@Query(value = "select o.* from orders o where o.order_id = ?1 and o.id_payer = ?2", nativeQuery = true)
	public OrderEntity findByIdOrderAndIdPayer(String idOrder, String idPayer);
	
	@Query(value = "select o.* "
			+ "from orders o inner join users u "
			+ "on o.id_user = u.id "
			+ "where u.username = ?1 and o.final_capture = ?2 "
			+ "order by o.create_time desc",
			nativeQuery = true)
	public List<OrderEntity> findAllByUsernameAndFinalCapture(String username, Boolean finalCapture);
	
	@Query(value = "select o.* "
			+ "from orders o inner join users u "
			+ "on o.id_user = u.id "
			+ "where u.username = ?1 and o.[status] not in ('RECEIVED') and o.final_capture = 1 "
			+ "order by o.create_time desc",
			nativeQuery = true)
	public List<OrderEntity> findAllOrderPaidByUsernameAndStatusNotReceived(String username);
	
	
	@Query(value = "select o.* "
			+ "from orders o "
			+ "where o.[status] = 'REFUND' "
			+ "order by o.create_time desc",
			nativeQuery = true)
	public List<OrderEntity> findAllOrderStatusRefund();
	
}
