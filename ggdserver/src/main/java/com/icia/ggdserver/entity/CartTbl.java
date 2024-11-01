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

    @Column(nullable = false, length = 10)
    private int quantity; // 장바구니 상품 개수


//    // 기본 생성자
//    public CartTbl() {}
//
//    // ProductTbl을 인자로 받는 생성자 추가
//    public CartTbl(ProductTbl product) {
//        if (product != null) {
//            this.productCode = product.getProductCode();
//        } else {
//            throw new IllegalArgumentException("Product cannot be null");
//        }
//    }
}
