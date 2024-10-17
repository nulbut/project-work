package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table (name = "Product_tbl")
@Data
public class ProductTbl { //상품 테이블
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private long productCode; //상품 고유번호

    @Column(name = "CategoryCode", nullable = false)
    private long CategoryCode; //카테고리 고유번호

    @Column(nullable = false, length = 40)
    private String ProductName; //상품 이름

    @Column(nullable = false)
    private String sellerId; //판매자

    @Column(nullable = false)
    private int sellerPayment; //판매가

    @Column(nullable = false)
    private int ProductLimit; // 구매제한

    @Column(nullable = false)
    private int ProductStock; //상품 수량

    @CreationTimestamp
    @Column
    private Timestamp ProductDate; //상품 등록일

    @Column(nullable = false, length = 100)
    private String productDetail; //상품 설명

    @Column
    private int ProductHit; //상품 조회수

    @Column(nullable = false, length = 1)
    private int ProductPurchaseLimit; //상품구매제한

    @Transient
    private List<ProductFileTbl> ProductFileList; //첨부파일
}
