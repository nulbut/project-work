package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "ProductFile_tbl")
@Data
public class ProductFileTbl { //첨부파일 테이블
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long productFileCode; //첨부파일 고유번호

    @Column(nullable = false)
    private long productFileNum; //게시글 번호

    @Column(nullable = false, length = 50)
    private String productFileSysname; //첨부파일 이미지

    @Column(nullable = false, length = 50)
    private String productFileOriname; //첨부파일 이미지2


}
