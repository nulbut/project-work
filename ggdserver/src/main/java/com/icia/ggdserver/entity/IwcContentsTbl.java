package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.ColumnDefault;

@Entity
@Table(name = "iwc_contents_tbl")
@Data
public class IwcContentsTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long iwcContentsCode;

    @Column(nullable = false)
    private long iwcContentsIwcCode;

    @Column(nullable = false, length = 50)
    private String iwcContentsSysname;

    @Column(nullable = false, length = 50)
    private String iwcContentsOriname;

    @Column(nullable = true, length = 50)
    private String iwcContentsName;

    @Column
    private long iwcContentVscount;

    @Column
    private long iwcContentWincount;

    @Column
    private long iwcContentFinalcount;


    @Column(length = 50, nullable = false)
    @ColumnDefault("''")
    private String iwcContentsCategory = "";
}
