package com.icia.ggdserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class GameVsDto {
    private Long win;
    private Long lose;
    private Long iwcCode;

}
