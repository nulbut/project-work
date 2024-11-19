package com.icia.ggdserver.dto;

import jakarta.persistence.Column;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Data
@Getter
@Setter
public class OrderWithDetailsDto {
    private long orderDetailId;
    private long orderId;
    private String seller_id;
    private String product_where;//'중고","입점"
    private long product_code;
    private String product_name;
    private int quantity;
    private int price;
    private int total_price;//  -- quantity * price

    private String userId;
    private String userName;
    private int totalAmount;
    private String status;    // 예: 'pending', 'completed', 'failed'
    private Timestamp createdAt;
    private Timestamp updatedAt;
    // 결제 정보

    private String paymentMethod;
    private String provider;
    private String paymentStatus;
    private String transactionId;

    public OrderWithDetailsDto(long orderDetailId, long orderId, String seller_id, String product_where,
                               long product_code, String product_name, int quantity, int price, int total_price,
                               String userId, String userName, int totalAmount, String status, Timestamp createdAt,
                               Timestamp updatedAt, String paymentMethod, String provider, String paymentStatus,
                               String transactionId) {
        this.orderDetailId = orderDetailId;
        this.orderId = orderId;
        this.seller_id = seller_id;
        this.product_where = product_where;
        this.product_code = product_code;
        this.product_name = product_name;
        this.quantity = quantity;
        this.price = price;
        this.total_price = total_price;
        this.userId = userId;
        this.userName = userName;
        this.totalAmount = totalAmount;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.paymentMethod = paymentMethod;
        this.provider = provider;
        this.paymentStatus = paymentStatus;
        this.transactionId = transactionId;
    }
}
