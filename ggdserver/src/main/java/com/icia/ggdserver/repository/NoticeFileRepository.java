package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.NoticeFileTbl;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface NoticeFileRepository extends CrudRepository<NoticeFileTbl, Long> {

    List<NoticeFileTbl> findAllByNfAid(long nnum);


    void deleteAllBynfAid(long nnum);
}
