package com.icia.ggdserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.util.List;

@Data
@Getter
@Setter
public class OrderRequestDto {
    private List<OrderInfoDto> buyData;  // 주문 항목 리스트
    private String sampeid;              // sampeid 값
    private String userName;
    private String userId;
    private int totalAmount;
    private String status;
}