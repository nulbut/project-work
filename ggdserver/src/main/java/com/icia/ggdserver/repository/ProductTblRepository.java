package com.icia.ggdserver.repository;

import  com.icia.ggdserver.entity.ProductTbl;
import  org.springframework.data.domain.Page;
import  org.springframework.data.domain.Pageable;
import  org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductTblRepository extends CrudRepository<ProductTbl, Long> {
    Page<ProductTbl> findByProductCodeGreaterThan(long ProductCode, Pageable pageable);

    Page<ProductTbl> findByProductCodeGreaterThanAndSellerId(long ProductCode, String sellerId, Pageable pb);
}
