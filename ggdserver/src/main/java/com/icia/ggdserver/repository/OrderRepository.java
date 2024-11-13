package com.icia.ggdserver.repository;


import com.icia.ggdserver.entity.OrderTbl;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface OrderRepository extends CrudRepository<OrderTbl, Long> {
    OrderTbl findByTransactionId(String sampid);



}
