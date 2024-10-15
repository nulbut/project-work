package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "Category2_tbl")
@Data
public class Category2Tbl { //카테고리2 테이블
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Category2Code; //카테고리2 고유번호2

    @Column
    private long Category3Code; //카테고리 고유번호3

    @Column(nullable = false, length = 30)
    private String Category2Name;//카테고리 이름2
}
