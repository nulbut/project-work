package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;


@Entity
@Table (name = "UsedProduct_tbl")
@Data
public class UsedProductTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long usedCode; //중고상품 고유번호

    @Column(name = "CategoryCode", nullable = false)
    private String usedcategoryCode; // 카테고리 고유 번호

    @Column(nullable = false, length = 40)
    private String usedName; //중고 상품 이름

    @Column(nullable = false)
    private String usedsellerId; // 중고판매자

    @Column(nullable = false)
    private int usedSeller; // 중고 판매가

    @Column(nullable = false)
    private int usedLimit; //구매제한

    @Column(nullable = false)
    private int usedStock; // 중고 상품 수량

    @CreationTimestamp
    @Column
    private Timestamp usedDate; // 중고 상품 등록일

    @Column(nullable = false, length = 200)
    private String usedDetail; //중고 상품 설명

    @Transient
    private UsedproductFileTbl thumbnail;

    @Transient
    private List<UsedproductFileTbl> UsedproductFileTblList; // 첨부파일

    @Transient
    private List<UproductReviewTbl> usedReviewTblList;


}