package com.icia.ggdserver.repository;


import com.icia.ggdserver.dto.OrderWithDetailsDto;
import com.icia.ggdserver.entity.OrderTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderRepository extends JpaRepository<OrderTbl, Long> {
    OrderTbl findByTransactionId(String sampid);

    @Query("SELECT new com.icia.ggdserver.dto.OrderWithDetailsDto(" +
            "od.orderDetailId, od.orderId, od.seller_id, od.product_where, od.product_code, od.product_name, " +
            "od.quantity, od.price, od.total_price, " +
            "o.userId, o.userName, o.totalAmount, o.status, o.createdAt, o.updatedAt, " +
            "o.paymentMethod, o.provider, o.paymentStatus, o.transactionId) " +
            "FROM OrderTbl o " +
            "JOIN OrderDetailTbl od ON o.orderId = od.orderId " +
            "WHERE od.seller_id = :sellerId")
    List<OrderWithDetailsDto> findBySellerId(@Param("sellerId") String sellerId);


}
