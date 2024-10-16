package com.icia.ggdserver.repository;


import com.icia.ggdserver.entity.IwcTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface IwcTblRepository extends CrudRepository<IwcTbl, Long> {
    Page<IwcTbl> findByIwcCodeGreaterThan(long pNum, Pageable pageable);
}


