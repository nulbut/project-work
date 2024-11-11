package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "uproductreview_tbl")
@Data
public class UproductReviewTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long uNum; //후기(댓글) 번호

    @Column
    private String uId; //작성자 아이디

    @Column
    @ColumnDefault("'중고 상품'")
    private String uProduct; //= "중고 상품"; // 상품 구분

    @Column
    private String uCode; // 상품 코드

    @Column
    private String uPreivew; // 상품 후기

    @CreationTimestamp
    @Column
    private Timestamp uRdate; // 작성 날짜
}
