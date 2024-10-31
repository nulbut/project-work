package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.NoticeFiletbl;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface NoticeFileRepository extends CrudRepository<NoticeFiletbl, Long> {

    List<NoticeFiletbl> findAllByNfAid(long nnum);


    void deleteAllBynfAid(long nnum);
}
