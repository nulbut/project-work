package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

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
    private String rContent;

    @Column
    private String rTitle;

    @Column
    private Timestamp rDate;

    @Column
    @ColumnDefault("'미처리'")
    private String rStatus = "미처리";

//    @Column
//    @ColumnDefault("'미처리")
//    private String rStatus = "미처리";

    @Transient
    private List<ReportFileTbl> rfList;

}
