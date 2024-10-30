package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "bproductfile_tbl")
@Data
public class BproductFileTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long bproductFileCode; //첨부파일 고유번호

    @Column(nullable = false)
    private long bproductFileNum; //상품 게시글 번호



    @Column(nullable = false, length = 50)
    private String bproductFileOriname; //상품 이미지
}
