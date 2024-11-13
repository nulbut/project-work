package com.icia.ggdserver.entity;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DialectOverride;

import java.sql.Timestamp;
import java.util.List;


@Entity
@Table(name = "\"bproduct_tbl\"")
@Data
public class BproductTbl { // 사업자 상품 테이블
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bpnum; //상품고유번호

    @Column(nullable = false)
    private String bsellerId; //판매자 상호 (닉네임)

    @Column(nullable = false)
    private String bprobid; //사업자 아이디

    @Column(nullable = false, length = 100)
    private String bpname; // 상품명

    @Column(nullable = false, length = 100)
    private int bpprice; //판매가격

    @Column(nullable = false, length = 100)
    private int bpprestriction; //구매제한

    @Column(nullable = false, length = 100)
    private int bpwarestock; //창고재고

//    @Column(length = 100)
//    private int bpwarestocklimt; //통보재고

    @Column
    @ColumnDefault("'판매중'")
    private String bcondition; // 상품 상태 (기본값 "정상", 창고재고 0일 경우 "품절")









//    @Column(length = 100)
//    private int bfackstock; //가재고
//
//    @Column(length = 10)
//    private String brestock; // 재입고 알림 (평소에는 null 이었다가
//    // 가재고가 통보재고보다 더 적은경우 "재입고 필요"로 변경)


    @Column(nullable = false, length = 10)
    private String bpdate; //출시일

    @Column(nullable = false, length = 2000)
    private String bpexplanation; //상품 상세 설명

//    @Column(nullable = false, length = 50)
//    private String bpdsysname; //상품 상세 이미지

//    @Column(length = 1)
//    private int bpoption; //옵션 사용 여부
//
//    @Column(length = 50)
//    private String bpoptionname; //옵션명
//
//    @Column(length = 100)
//    private String bpoptionstock; //옵션 재고 수

    @Column(length = 50)
    private String bpsize; //사이즈

    @Column(length = 50)
    private String bpmaterial; //재질

    @Column(length = 50)
    private String bproductFileSysnameM; // 상품 대표 이미지

    @CreationTimestamp
    @Column(name = "bp_signdt")
    private Timestamp bpsigndt; //등록일

    @Transient
    private List<BproductFileTbl> bproductFileTblList; //첨부 파일

    @PreUpdate
    public void checkStockBeforeUpdate() {
        //품절 상태 확인
        if (this.bpwarestock <= 0) {
            this.bcondition = "품절";
        } else {
            this.bcondition = "판매중";
        }

    }

}