package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.NoticeTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface NoticeRepository extends CrudRepository<NoticeTbl, Long> {

    @Query(value = "select * from notice_tbl order by is_pinned desc", nativeQuery = true)
    Page<NoticeTbl> getNoticeTbl(Pageable pageable);

}
