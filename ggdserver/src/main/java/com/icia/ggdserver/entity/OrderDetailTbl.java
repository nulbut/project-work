package com.icia.ggdserver.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "order_detail_tbl")
@Data
public class OrderDetailTbl {
    //  -- 상품 내역
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long orderDetailId;
    @Column
    private long orderId;
    @Column
    private String seller_id;
    @Column
    private String product_where;//'중고","입점"
    @Column
    private long product_code;
    @Column
    private String product_name;
    @Column
    private int quantity;
    @Column
    private int price;
    @Column
    private int total_price;//  -- quantity * price
}
