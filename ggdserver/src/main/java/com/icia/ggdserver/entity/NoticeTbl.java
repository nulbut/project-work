package com.icia.ggdserver.entity;


import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "notice_tbl")
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

}
