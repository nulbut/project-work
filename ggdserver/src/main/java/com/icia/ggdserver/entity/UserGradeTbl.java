package com.icia.ggdserver.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "usergrade_tbl")
@Data
public class UserGradeTbl {
    @Id
    private int ugId;

    @Column
    private String ugName;

    @Column
    private long ugDuration;
}
