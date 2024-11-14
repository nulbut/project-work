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
    private long orderId; //기본키

    @Column
    private String userId; //주문자 아이디
    @Column
    private String userName; // 주문자 이름

    @Column
    private int totalAmount; // 총 결제금액
    @Column
    private String status;    // 예: 'pending', 'completed', 'failed'
    @CreationTimestamp
    @Column
    private Timestamp createdAt; // 결제요청 보낼때 생성되는 시각
    @UpdateTimestamp
    @Column
    private Timestamp updatedAt; // 마지막에 결제요청에 반응이 오는 시각

  // 결제 정보
    @Column
    private String paymentMethod;
    @Column
    private String provider;
    @Column
    private String paymentStatus; //결제 상태
    @Column
    private String transactionId; //요청된 key

}
