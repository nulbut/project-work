package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.UproductReviewTbl;
import com.icia.ggdserver.entity.UsedProductTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UproductReviewTblRepository {
    Page<UproductReviewTbl> findByuIdGreaterThan(String uId, Pageable pageable);
}
