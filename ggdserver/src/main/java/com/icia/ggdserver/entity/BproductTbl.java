package com.icia.ggdserver.entity;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;


@Entity
@Table(name = "\"bproduct_tbl\"")
@Data
public class BproductTbl { // 사업자 상품 테이블
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bpnum; //상품번호

//    @Column(nullable = false, length = 50)
//    private String bprsysname; //상품 대표 이미지

    @Column(nullable = false, length = 100)
    private String bpname; // 상품명

    @Column(nullable = false, length = 100)
    private int bpprice; //판매가격

    @Column(nullable = false, length = 100)
    private int bpprestriction; //구매제한

    @Column(nullable = false, length = 100)
    private int bpwarestock; //창고재고

    @Column(nullable = false, length = 10)
    private String bpdate; //출시일

    @Column(nullable = false, length = 2000)
    private String bpexplanation; //상품 상세 설명

//    @Column(nullable = false, length = 50)
//    private String bpdsysname; //상품 상세 이미지

    @Column(nullable = false, length = 1)
    private int bpoption; //옵션 사용 여부

    @Column(length = 50)
    private String bpoptionname; //옵션명

    @Column(length = 100)
    private String bpoptionstock; //옵션 재고 수

    @Column(length = 50)
    private String bpsize; //사이즈

    @Column(length = 50)
    private String bpmaterial; //재질

    @CreationTimestamp
    @Column(name = "bp_signdt")
    private Timestamp bpsigndt; //등록일

}