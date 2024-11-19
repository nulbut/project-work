package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "order_tbl")
@Data
public class OrderTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderId;

    @Column
    private String userId;
    @Column
    private String userName;

    @Column
    private int totalAmount;
    @Column
    private String status;    // 예: 'pending', 'completed', 'failed'
    @CreationTimestamp
    @Column
    private Timestamp createdAt;
    @UpdateTimestamp
    @Column
    private Timestamp updatedAt;

  // 결제 정보
    @Column
    private String paymentMethod;
    @Column
    private String provider;
    @Column
    private String paymentStatus;
    @Column
    private String transactionId;

}
