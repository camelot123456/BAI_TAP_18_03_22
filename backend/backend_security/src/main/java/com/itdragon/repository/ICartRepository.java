package com.itdragon.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itdragon.entity.CartEntity;

public interface ICartRepository extends JpaRepository<CartEntity, Long>{

}
