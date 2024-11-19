package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.DmsgTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DirectMessageRepository extends CrudRepository<DmsgTbl, Long> {

    Page<DmsgTbl> findByDNumGreaterThan(long DNum, Pageable pb);
}
