package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.CartTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface CartRepository extends CrudRepository<CartTbl, Long> {
    Page<CartTbl> findByCartCodeGreaterThanAndCnid(long CartCode, String cnid, Pageable pb);
}
