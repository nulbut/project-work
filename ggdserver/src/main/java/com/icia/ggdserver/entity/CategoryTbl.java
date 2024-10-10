package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "Category_tbl")
@Data
public class CategoryTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long CategoryCode;

    @Column(nullable = false)
    private long CategoryCode2;

    @Column(nullable = false, length = 30)
    private String CategoryName;

}
