package com.icia.ggdserver.repository;


import com.icia.ggdserver.entity.ReportTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface ReportRepository extends CrudRepository<ReportTbl, Long> {

    Page<ReportTbl> findByrNumGreaterThan(long rnum, Pageable pb);

    @Modifying
    @Query(value = "update ReportTbl rt set rt.rStatus = '처리 완료' where rt.rNum = :rnum")
    void updateByRNum(@Param("rnum") long rnum);
}
