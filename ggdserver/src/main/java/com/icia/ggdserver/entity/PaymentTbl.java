package com.icia.ggdserver.entity;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "payment_tbl")
@Data
public class PaymentTbl {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long payid;

    private String orderId;

    private String amount;

    private String paymentKey;

    private LocalDateTime paymentDate;
}
