package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.CartTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CartRepository extends CrudRepository<CartTbl, Long> {

    Page<CartTbl> findByCartCodeGreaterThanAndCnid(long CartCode, String cnid, Pageable pb);

    int deleteCartByCartCode(long cartCode);

    void deleteByCartCode(long cartCode);

    CartTbl findByCartCode(long cartCode);


    List<CartTbl> findByCnid(String cnid);
}
