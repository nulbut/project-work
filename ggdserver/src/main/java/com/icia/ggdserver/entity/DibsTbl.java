package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table (name = "dibs_tbl")
@Data
public class DibsTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long dibsCode; // 찜 고유번호

    @Column(nullable = false)
    private String dnid; // 회원 아이디

    @Column(nullable = false)
    private long productCode; // 상품고유 번호

    @Column(nullable = false)
    private long bpnum;

    @Column(nullable = false)
    private long usedCode;

    @CreationTimestamp
    @Column(nullable = false)
    private Timestamp dibsDate; // 찜 등록일

    @Transient
    private ProductTbl productinfo;

    @Transient
    private UsedProductTbl usedinfo;

    @Transient
    private BproductTbl bproductinfo;
}
