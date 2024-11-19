package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.BoardTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface BoardRepository extends CrudRepository<BoardTbl, Long> {
    //페이징 처리한 목록을 가져오는 메소드
    Page<BoardTbl> findByBoardCodeGreaterThan(long BoardCode, Pageable pageable);


    Page<BoardTbl> findByBoardCodeGreaterThanAndBnid(long BoardCode, String bnid, Pageable pb);

    Page<BoardTbl> findByBoardCodeGreaterThanAndBnidAndProductCodeAndUsedCode(long BoardCode, String bnid, long productCode, long usedCode, Pageable pb);
}
