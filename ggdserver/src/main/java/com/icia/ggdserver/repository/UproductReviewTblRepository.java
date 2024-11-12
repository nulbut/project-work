package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.UproductReviewTbl;
import com.icia.ggdserver.entity.UsedProductTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface UproductReviewTblRepository extends CrudRepository<UproductReviewTbl, Long> {
    Page<UproductReviewTbl> findByUIdGreaterThan(String uId, Pageable pb);

}
