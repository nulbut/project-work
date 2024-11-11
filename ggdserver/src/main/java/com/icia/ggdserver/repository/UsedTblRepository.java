package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.UsedProductTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;


public interface UsedTblRepository extends CrudRepository<UsedProductTbl, Long> {

    Page<UsedProductTbl> findByUsedCodeGreaterThanAndUsedsellerId(long UsedCode, String usedsellerId, Pageable pb);

    Page<UsedProductTbl> findByusedCodeGreaterThan(long usedCode, Pageable pageable);

    UsedProductTbl findByUsedCode(long usedCode);
}
