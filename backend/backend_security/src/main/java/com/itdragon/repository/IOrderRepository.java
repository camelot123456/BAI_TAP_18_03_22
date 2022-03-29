package com.itdragon.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itdragon.entity.OrderEntity;

public interface IOrderRepository extends JpaRepository<OrderEntity, Long>{

}
