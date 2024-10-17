package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table (name = "board_tbl")
@Data
public class BoardTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardCode;//문의 게시글 번호

    @Column(nullable = false)
    private String bnid; // 회원 ID

    @Column
    private long ProductCode;//상품고유번호

    @Column(nullable = false)
    private String boardNtype;// 문의 종류

    @Column(nullable = false, length = 50)
    private String boardTitle;//글제목

    @Column(nullable = false,length = 300)
    private String boardContent;//글내용

    @CreationTimestamp
    @Column
    private Timestamp boardDate;//문의 게시글 등록일

    @Transient
    private List<ProductFileTbl> ProductFileList;// 첨부파일
}
