package com.icia.ggdserver.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "report_file_tbl")
@Data
public class ReportFileTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long rfNum;

    @Column(nullable = false)
    private long rfUid;

    @Column(nullable = false, length = 50)
    private String rfSysname;

    @Column(nullable = false, length = 50)
    private String rfOriname;
}
