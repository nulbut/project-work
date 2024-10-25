package com.icia.ggdserver.repository;


import com.icia.ggdserver.entity.IwcContentsTbl;
import com.icia.ggdserver.entity.IwcTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface IwcTblRepository extends CrudRepository<IwcTbl, Long> {
    Page<IwcTbl> findByIwcCodeGreaterThanAndIwcPublicEquals(long pNum, long ispub, Pageable pageable);
//    Page<IwcTbl> findByIwcCodeGreaterThan(long pNum, Pageable pageable);

    @Query(value = "update iwc_tbl set iwc_views = iwc_views +1 " +
            "where iwc_code = :iwcCode",nativeQuery = true)
    @Modifying
    @Transactional
    void updateViews(@Param(value = "iwcCode") long pNum);

//    @Query
//    void updateIwcTblByIwcFirstImageAndIwcFirstNameAndIwcSecondImageAndIwcSecondName(List<IwcContentsTbl> firstsecond);

    @Query(value = "update iwc_tbl i set i.iwc_first_image = :#{#first.iwcContentsSysname},\n" +
            "i.iwc_first_name =:#{#first.iwcContentsName}\n" +
            " where i.iwc_code = :#{#first.iwcContentsIwcCode}",nativeQuery = true)
    @Modifying
    @Transactional
    void setFirstImg(@Param(value = "first") IwcContentsTbl first);

    @Query(value = "update iwc_tbl i set i.iwc_second_image = :#{#second.iwcContentsSysname},\n" +
            "i.iwc_second_name =:#{#second.iwcContentsName}\n" +
            " where i.iwc_code = :#{#second.iwcContentsIwcCode}",nativeQuery = true)
    @Modifying
    @Transactional
    void setSecondImg(@Param(value = "second") IwcContentsTbl second);
}


