package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.IwcLikeTbl;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IwcLikeRepository extends CrudRepository<IwcLikeTbl,Long> {

    List<IwcLikeTbl> findByIwcCodeInAndLikeNid(List<Long> iwcCodes, String nid);

    @Query(value = "SELECT iwc_code\n" +
            "      FROM iwc_like_tbl\n" +
            "      WHERE like_nid = :nid" ,nativeQuery = true)
    List<Long> findIwcCodes(@Param("nid") String nid);
    
    @Modifying
    @Transactional
    void deleteByIwcCodeAndLikeNid(long iwcCode, String likeNid);

    long countByIwcCode(long iwcCode);
}
