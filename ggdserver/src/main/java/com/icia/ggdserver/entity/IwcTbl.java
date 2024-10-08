package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Table(name = "iwc_tbl")
@Data
public class IwcTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long iwcCode;

    @Column(nullable = false, length = 50)
    private String iwcName;

    @Column(nullable = false, length = 100)
    private String iwcExplanation;

    @Column(nullable = true, length = 20)
    private String iwcAuthor;

    @Column(nullable = true, length = 100)
    private String iwcGenre;

    @Column
    private long iwcLike;

    @Column
    private long iwcViews;

    @Column
    private long iwcComplete;

    @Column
    private Timestamp iwcDate;

    @Column(length = 1)
    private int iwcIspublic;


}
