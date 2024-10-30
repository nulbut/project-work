package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "UsedproductFile_tbl")
@Data

public class UsedproductFileTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long usedFileCode; // 첨부파일 고유번호

    @Column(nullable = false)
    private long usedFileNum; // 중고상품 게시글 번호

    @Column(nullable = false, length = 50)
    private String usedFileSysname; // 첨부파일 이미지

    @Column(nullable = false, length = 50)
    private String usedFileOriname; // 첨부파일 이미지2
}
