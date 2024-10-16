package com.icia.ggdserver.repository;

import  com.icia.ggdserver.entity.ProductTbl;
import  org.springframework.data.domain.Page;
import  org.springframework.data.domain.Pageable;
import  org.springframework.data.repository.CrudRepository;

public interface ProductTblRepository extends CrudRepository<ProductTbl, Long> {
    Page<ProductTbl> findByProductCodeGreaterThan(long pNum, Pageable pageable);
}
