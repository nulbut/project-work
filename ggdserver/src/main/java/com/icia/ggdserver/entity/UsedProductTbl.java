package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "UsedProduct_tbl")
@Data
public class UsedProductTbl {// 중고 상품 테이블
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long upNum; // 상품 번호 

    @Column(nullable = false, length = 100)
    private String upName; // 제품명

    @Column(nullable = false, length = 100)
    private int upPrice; // 판매가격

    @Column(nullable = false, length = 100)
    private int upPurchaserestrictions; // 구매제한

    @Column(nullable = false, length = 100)
    private int upDeliveryfee; // 배송비

    @Column(nullable = false, length = 100)
    private int upQuantity; // 수량

    @Column(nullable = false, length = 10)
    private String upDate; // 등록일

    @Column(nullable = false, length = 2000)
    private String upDetail; // 상품 정보
}
