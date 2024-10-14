package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "Category_tbl")
@Data
public class CategoryTbl { //카테고리 테이블
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long CategoryCode; //카테고리 고유번호

    @Column(nullable = false)
    private long CategoryCode2; //카테고리 고유번호2

    @Column(nullable = false, length = 30)
    private String CategoryName; //카테고리 이름

}
