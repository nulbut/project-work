package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "iwc_like_tbl")
@Data
public class IwcLikeTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long iwcLikeId;

    @Column
    private long iwcCode;

    @Column
    private String likeNid;

    @CreationTimestamp
    @Column
    private Timestamp iwcLikeDate;
}
