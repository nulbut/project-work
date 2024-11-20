package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.DmFileTbl;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface DmFileRepository extends CrudRepository<DmFileTbl, Long> {

    List<DmFileTbl> findByDfUid(long DNum);
}
