//package com.icia.ggdserver.entity;
//
//
//import jakarta.persistence.*;
//import lombok.Data;
//import org.hibernate.annotations.ColumnDefault;
//import org.hibernate.annotations.CreationTimestamp;
//
//import java.sql.Timestamp;
//
//@Entity
//@Table(name = "Dmsg_tbl")
//@Data
//public class DmsgTbl {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private long dNum;
//
//    @Column
//    private String dContent;
//
//    @Column
//    private String dAdminId;
//
//    @Column
//    private String dTitle;
//
//    @CreationTimestamp
//    @Column
//    private Timestamp rDate;
//
//    @Column
//    private String dComment;
//
//    @Column
//    @ColumnDefault("'미처리")
//    private String dStatus = "미처리";
//
//}
