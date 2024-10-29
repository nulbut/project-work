package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "notice_file_tbl")
@Data
public class NoticeFiletbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long nfNum;

    @Column(nullable = false)
    private long nfAid;

    @Column(nullable = false, length = 50)
    private String nfSysname;

    @Column(nullable = false, length = 50)
    private String nfOriname;
}
