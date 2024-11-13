package com.icia.ggdserver.repository;


import com.icia.ggdserver.entity.OrderDetailTbl;
import org.springframework.data.repository.CrudRepository;

public interface OrderDetailRepository extends CrudRepository<OrderDetailTbl, Long> {
}
