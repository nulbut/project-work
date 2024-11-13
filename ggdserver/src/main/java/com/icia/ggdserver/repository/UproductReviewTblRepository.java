package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.UproductReviewTbl;
import com.icia.ggdserver.entity.UsedProductTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UproductReviewTblRepository extends CrudRepository<UproductReviewTbl, Long> {
    Page<UproductReviewTbl> findByUIdGreaterThan(String uId, Pageable pb);

    //후기 목록 가져오기
    @Query("select urt from UproductReviewTbl urt where urt.uCode = :ucode order by urt.uNum")
    List<UproductReviewTbl> findByUCode(@Param("ucode") Long ucode);
}
