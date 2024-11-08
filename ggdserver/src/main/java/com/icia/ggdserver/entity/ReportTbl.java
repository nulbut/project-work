package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table(name = "report_tbl")
@Data
public class ReportTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long rNum;

    @Column
    private String rUid;

    @Column
    private String rReason;

    @Column
    private String rContent;

    @Column
    private String rFrom;

    @Column
    private long fromCode;

    @Column
    @ColumnDefault("'미처리'")
    private String rStatus = "미처리";

    @CreationTimestamp
    @Column
    private Timestamp rDate;



//    @Column
//    @ColumnDefault("'미처리")
//    private String rStatus = "미처리";

    @Transient
    private List<ReportFileTbl> rfList;

}
