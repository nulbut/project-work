package com.icia.ggdserver.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "bproduct_tbl")
@Data
public class bproductTbl { // 사업자 상품 테이블
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bp_num; //상품번호

    @Column(nullable = false, length = 50)
    private String bp_rsysname; //상품 대표 이미지

    @Column(nullable = false, length = 100)
    private String bp_name; // 상품명

    @Column(nullable = false, length = 100)
    private int bp_price; //판매가격

    @Column(nullable = false, length = 100)
    private int bp_prestriction; //구매제한

    @Column(nullable = false, length = 100)
    private int bp_warestock; //창고재고

    @Column(nullable = false, length = 10)
    private String bp_date; //출시일

    @Column(nullable = false, length = 2000)
    private String bp_explanation; //상품 상세 설명

    @Column(nullable = false, length = 50)
    private String bp_dsysname; //상품 상세 이미지

    @Column(nullable = false, length = 1)
    private int bp_option; //옵션 사용 여부

    @Column(length = 50)
    private String bp_optionname; //옵션명

    @Column(length = 100)
    private String bp_optionstock; //옵션 재고 수

    @Column(length = 50)
    private String bp_size; //사이즈

    @Column(length = 50)
    private String bp_material; //재질

}
