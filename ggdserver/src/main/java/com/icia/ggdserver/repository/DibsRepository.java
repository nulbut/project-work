package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.DibsTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface DibsRepository extends CrudRepository<DibsTbl,Long> {


    Page<DibsTbl> findBydibsCodeGreaterThanAndDnid(long dibcCode, String dnid, Pageable pb);
}