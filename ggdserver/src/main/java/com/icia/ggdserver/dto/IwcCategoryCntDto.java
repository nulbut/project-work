package com.icia.ggdserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class IwcCategoryCntDto {
    private String categoryName;
    private int categoryCnt;

    public IwcCategoryCntDto(String s, int i) {
    }
}
