package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.CartTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CartRepository extends CrudRepository<CartTbl, Long> {

    Page<CartTbl> findByCartCodeGreaterThanAndCnid(long CartCode, String cnid, Pageable pb);

    CartTbl findByCartCode(long cartCode);

    List<CartTbl> findByCnid(String cnid);

    //장바구니  상품 중복체크
    CartTbl findByCnidAndProductCode(String cnid, long productCode);

    //장바구니 중고상품 중복체크
    CartTbl findByCnidAndUsedCode(String cnid, long usedCode);
}
