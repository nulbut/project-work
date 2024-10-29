package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.NoticeTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

public interface NoticeRepository extends CrudRepository<NoticeTbl, Long> {

    Page<NoticeTbl> findBynNumGreaterThan(long nNum, Pageable pageable);

}
