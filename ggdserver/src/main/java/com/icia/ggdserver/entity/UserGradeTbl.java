package com.icia.ggdserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "usergrade_tbl")
public class UserGradeTbl {
    @Id
    private long ugId;

    @Column
    private String ugName;

    @Column
    private long ugDuration;
}
