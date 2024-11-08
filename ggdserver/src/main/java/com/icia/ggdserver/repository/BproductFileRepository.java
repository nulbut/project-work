package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.BproductFileTbl;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BproductFileRepository extends CrudRepository<BproductFileTbl, Long> {

    List<BproductFileTbl> findByBproductfilenum(long bproductfilenum);
    //해당하는 파일 목록을 삭제하는 메소드
    void deleteByBproductfilenum(long bproductfilenum);

    @Modifying
    @Query(value = "delete from BproductFileTbl bf where bf.bproductfilenum in :bproductfilenum")
    void deleteAllByBproductfilenums(@Param("bproductfilenum") List<Long> productFileNums);

    @Modifying
    @Query(value = "select bf.bproductfilesysname from BproductFileTbl bf where bf.bproductfilenum in :bproductfilenum")
    List<String> selectBproductfilesysnames(@Param("bproductfilenum") List<Long> productFileNums);
}
