package com.icia.ggdserver.entity;


import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "Dmsg_tbl")
@Data
public class DmsgTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long DNum;

    @Column
    private String dContent;

    @Column
    private String dUid;

    @Column
    private String dTitle;

    @CreationTimestamp
    @Column
    private Timestamp rDate;

    @Column
    private String dComment;

    @UpdateTimestamp
    @Column
    private Timestamp cDate;

    @Column
    @ColumnDefault("'답변 전'")
    private String dStatus = "답변 전";

}
