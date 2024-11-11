package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.UsedproductFileTbl;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface UsedFileRepository extends CrudRepository<UsedproductFileTbl, Long> {

    List<UsedproductFileTbl> findByUsedFileNum(long usedFileNum);

    void deleteByUsedFileNum(long usedCode);
}
