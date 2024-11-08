package com.icia.ggdserver.entity;


import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "dmfile_tbl")
@Data
public class DmFileTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long dfNum;

    @Column(nullable = false)
    private long dfUid;

    @Column(nullable = false, length = 50)
    private String dfSysname;

    @Column(nullable = false, length = 50)
    private String dfOriname;
}
