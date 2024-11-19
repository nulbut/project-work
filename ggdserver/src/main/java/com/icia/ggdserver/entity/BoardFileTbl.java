package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "BoardFile_tbl")
@Data
public class BoardFileTbl { //문의게시판 첨부파일 테이블
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long boardFileId; //문의게시판 첨부파일 고유번호

    @Column(nullable = false)
    private long boardFileNum; //문의게시판 첨부파일 번호

    @Column(nullable = false , length = 50)
    private String boardFileSysname; //문의게시판 첨부파일 이미지

    @Column(nullable = false, length = 50)
    private String boardFileOriname; //문의게시판 첨부파일 이미지2
}
