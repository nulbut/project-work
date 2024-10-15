package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "Category3_tbl")
@Data
public class Category3Tbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long Category3Code;// 카테고리 고유번호3

    @Column(nullable = false)
    private String Category3Name;// 카테고리 이름
}
