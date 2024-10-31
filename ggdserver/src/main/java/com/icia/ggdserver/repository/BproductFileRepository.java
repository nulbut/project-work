package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.BproductFileTbl;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface BproductFileRepository extends CrudRepository<BproductFileTbl, Long> {

    List<BproductFileTbl> findByBproductfilenum(long bproductfilenum);
    //해당하는 파일 목록을 삭제하는 메소드
    void deleteByBproductfilenum(long bproductfilenum);
}
