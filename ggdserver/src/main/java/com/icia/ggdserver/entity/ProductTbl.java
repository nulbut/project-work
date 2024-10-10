package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.List;

@Entity
@Table (name = "Product_tbl")
@Data
public class ProductTbl {
    @Id
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private long productCode;

    @Column(name = "CategoryCode")
    private long CategoryCode;

    @Column(nullable = false, length = 40)
    private String ProductName;

    @Column(nullable = false)
    private String sellerId;

    @Column(nullable = false)
    private int sellerPayment;

    @Column(nullable = false)
    private int ProductStock;

    @CreationTimestamp
    @Column
    private Timestamp ProductDate;

    @Column
    private int ProductHit;

    @Transient
    private List<ProductFileTbl> ProductFileList;
}
