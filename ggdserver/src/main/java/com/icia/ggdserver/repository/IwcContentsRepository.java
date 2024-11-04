package com.icia.ggdserver.repository;

import com.icia.ggdserver.dto.IwcCategoryCntDto;
import com.icia.ggdserver.dto.TurnImgDto;
import com.icia.ggdserver.entity.IwcContentsTbl;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

public interface IwcContentsRepository extends CrudRepository<IwcContentsTbl, Long> {
    List<IwcContentsTbl> findAllByIwcContentsIwcCode(Long iwcContentsIwcCode);

    List<IwcContentsTbl> findTop2ByIwcContentsIwcCode(Long iwcContentsIwcCode);

    @Query(value = "select * " +
            "from iwc_contents_tbl where iwc_contents_iwc_code = :id " +
            "order by iwc_contents_code limit 2",nativeQuery = true)
    List<IwcContentsTbl> findimg(@Param(value = "id") long id );

    @Query(value = "update iwc_contents_tbl set iwc_content_vscount = iwc_content_vscount +1 " +
            "where iwc_contents_code = :iwcContentsCode",nativeQuery = true)
    @Modifying
    @Transactional
    void updateVs(@Param(value = "iwcContentsCode") long iwcContentsCode);

    @Query(value = "update iwc_contents_tbl set iwc_content_wincount = iwc_content_wincount +1 " +
            "where iwc_contents_code = :iwcContentsCode",nativeQuery = true)
    @Modifying
    @Transactional
    void updateWin(@Param(value = "iwcContentsCode") long iwcContentsCode);

    @Query(value = "update iwc_contents_tbl set iwc_content_finalcount = iwc_content_finalcount +1 " +
            "where iwc_contents_code = :iwcContentsCode",nativeQuery = true)
    @Modifying
    @Transactional
    void updateFinal(@Param(value = "iwcContentsCode") long iwcContentsCode);



    @Modifying
    @Transactional
    void deleteByIwcContentsIwcCode(Long iwccode);


    @Query(value = "select iwc_contents_category,count(*) from iwc_contents_tbl where iwc_contents_category != '' group by " +
            "iwc_contents_category order by count(*) desc limit 10",nativeQuery = true)

    List<Object[]> categoryCnt();





}
