package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.UsedProductTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;


public interface UsedTblRepository extends CrudRepository<UsedProductTbl, Long> {

    Page<UsedProductTbl> findByUsedCodeGreaterThanAndUsedsellerId(long UsedCode, String usedsellerId, Pageable pb);

    Page<UsedProductTbl> findByusedCodeGreaterThan(long usedCode, Pageable pageable);

    @Query(value = "SELECT * FROM used_product_tbl WHERE REPLACE(used_name, ' ', '') LIKE CONCAT('%', REPLACE(:category, ' ', ''), '%') ORDER BY RAND() LIMIT 3", nativeQuery = true)
    List<UsedProductTbl> findRandomUsedProductsByName(@Param("category") String category);

    UsedProductTbl findByUsedCode(long usedCode);
}
