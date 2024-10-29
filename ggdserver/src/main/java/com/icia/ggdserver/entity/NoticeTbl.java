package com.icia.ggdserver.entity;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "notice_tbl")
@Data
public class NoticeTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long nNum;

    @Column
    private String nContent;

    @Column
    private String nAdminId;

    @Column
    private String nTitle;

    @CreationTimestamp
    @Column
    private Timestamp rDate;

    @Column
    private int isPinned;

    @Transient
    private List<NoticeFiletbl> nfList;

}
