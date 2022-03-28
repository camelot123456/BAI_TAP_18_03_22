package com.itdragon.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itdragon.entity.ProductEntity;

public interface IProductRepository extends JpaRepository<ProductEntity, Long> {

}
