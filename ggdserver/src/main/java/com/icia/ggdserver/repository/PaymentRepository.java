package com.icia.ggdserver.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.icia.ggdserver.entity.PaymentTbl;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentTbl, Long> {

}
