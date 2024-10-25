package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.BoardTbl;
import com.icia.ggdserver.entity.BproductTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface BproductRepository extends CrudRepository<BproductTbl,Long> {
    Page<BproductTbl> findByBpnumGreaterThan(long BoardCode, Pageable pageable);
}
