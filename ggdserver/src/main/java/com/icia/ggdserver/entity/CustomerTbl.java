package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "customer_tbl")
@Data
public class CustomerTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cid;

    @Column(nullable = false, unique = true)
    private String ccustomerKey;  // 고객 고유 ID

    private String cname;  // 고객 이름

    private String cemail;  // 고객 이메일

    private String cphonenum;  // 고객 전화번호

    @Column(nullable = false, updatable = false)
    private LocalDateTime ccreatedAt = LocalDateTime.now();  // 생성일시

    private LocalDateTime cupdatedAt = LocalDateTime.now();  // 수정일시

}
