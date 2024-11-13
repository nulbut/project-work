package com.icia.ggdserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class OrderInfoDto {
    private String name;
    private String product_where;
    private int price;
    private long product_code;
    private int quantity;
    private String seller_id;
}
