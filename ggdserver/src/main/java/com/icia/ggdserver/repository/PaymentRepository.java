package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.PaymentTbl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentTbl, Long> {
    // 필요한 경우, 추가적인 쿼리 메서드 정의 가능
    PaymentTbl findByPorderId(String porderId);
}
