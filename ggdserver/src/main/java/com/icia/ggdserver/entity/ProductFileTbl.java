package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table (name = "ProductFile_tbl")
@Data
public class ProductFileTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long ProductFileCode;

    @Column(nullable = false)
    private String ProductFileNum;

    @Column(nullable = false, length = 50)
    private String ProductFileSysname;

    @Column(nullable = false, length = 50)
    private String ProductFileOriname;


}
