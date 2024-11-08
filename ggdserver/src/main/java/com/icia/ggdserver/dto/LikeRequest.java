package com.icia.ggdserver.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class LikeRequest {
    private long iwcCode;
    private String likeNid;
    private boolean liked;
}