package com.icia.ggdserver.repository;


import com.icia.ggdserver.entity.ReportTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

public interface ReportRepository extends CrudRepository<ReportTbl, Long> {

    Page<ReportTbl> findByrNumGreaterThan(long rnum, Pageable pb);
}
