package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table (name = "cart_tbl")
@Data
public class CartTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long cartCode;// 장바구니 고유번호

    @Column(nullable = false)
    private String cnid; // 회원 아이디

    @Column(nullable = false)
    private long productCode; //상품 코드번호

    @Transient
    private List<ProductTbl> pdtList;
}
