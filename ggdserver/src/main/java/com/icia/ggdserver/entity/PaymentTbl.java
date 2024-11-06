package com.icia.ggdserver.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Entity
@Table(name = "payment_tbl")
@Data
public class PaymentTbl {
    @Id
    // @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String oderId;

    private String amount;

    private String paymentKey;

    private LocalDateTime paymentDate;

}
