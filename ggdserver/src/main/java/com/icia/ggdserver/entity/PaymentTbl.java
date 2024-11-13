package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "payment_tbl")
@Data
public class PaymentTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pid;

    @Column(nullable = false, unique = true)
    private String porderId;  // 고유 주문 ID

    @Column(nullable = false)
    private String pcustomerkey;  // 고객 고유 ID

    @Column(nullable = false)
    private Integer pamount;  // 결제 금액

    @Column(nullable = false)
    private String pcurrency = "KRW";  // 기본 통화

    @Column(nullable = false)
    private String pstatus = "PENDING";  // 결제 상태 (예: PENDING, SUCCESS, FAILED)

    private String successUrl;  // 결제 성공 시 URL

    private String failUrl;  // 결제 실패 시 URL

    private String pcustomeremail;// 고객 이메일

    private String pcustomername;  // 고객 이름

    private String pcustomerphonenum;  // 고객 전화번호

    @Column(nullable = false, updatable = false)
    private LocalDateTime pcreatedAt = LocalDateTime.now();  // 생성일시

    private LocalDateTime pupdatedAt = LocalDateTime.now();  // 수정일시

}