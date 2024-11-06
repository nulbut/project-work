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

import java.sql.Timestamp;
import java.time.LocalDate;
import java.util.List;

public interface IwcTblRepository extends CrudRepository<IwcTbl, Long> {
    Page<IwcTbl> findByIwcCodeGreaterThanAndIwcPublicEquals(long pNum, long ispub, Pageable pageable);


    Page<IwcTbl> findByIwcCodeGreaterThanAndIwcAuthorEquals(long pNum,  String id, Pageable pageable);


    Page<IwcTbl> findByIwcCodeGreaterThan(long pNum, Pageable pageable);

    @Query(value = "update iwc_tbl set iwc_views = iwc_views +1 " +
            "where iwc_code = :iwcCode",nativeQuery = true)
    @Modifying
    @Transactional
    void updateViews(@Param(value = "iwcCode") long pNum);

    @Query(value = "update iwc_tbl set iwc_complete = iwc_complete +1 " +
            "where iwc_code = :iwcCode",nativeQuery = true)
    @Modifying
    @Transactional
    void updateComplete(@Param(value = "iwcCode") long iwcCode);

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
    //select * from iwc_tbl where iwc_date like "2024-11-04%"
    //    long countAllByIwcDateLike(Timestamp iwcDate);
    @Query(value = "select count(*) " +
            "from iwc_tbl where iwc_date like concat( :date , '%') " ,nativeQuery = true)
    Long countCupToday(@Param(value = "date") String date );


    @Query(value = "SELECT \n" +
            "    dates.date,\n" +
            "    IFNULL(count(t.iwc_date), 0) AS amount\n" +
            "FROM (\n" +
            "    SELECT CURDATE() - INTERVAL a DAY AS date\n" +
            "    FROM (\n" +
            "        SELECT 0 AS a UNION ALL SELECT 1 UNION ALL SELECT 2 UNION ALL\n" +
            "        SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5 UNION ALL\n" +
            "        SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 UNION ALL\n" +
            "        SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL\n" +
            "        SELECT 12 UNION ALL SELECT 13 UNION ALL SELECT 14\n" +
            "    ) AS days\n" +
            ") AS dates\n" +
            "LEFT JOIN iwc_tbl t\n" +
            "    ON dates.date = date(t.iwc_date)\n" +
            "    GROUP BY dates.date\n" +
            "ORDER BY dates.date ASC;" ,nativeQuery = true)
    List<Object[]> periodMakeCupCnt();

    @Query(value = "SELECT *\n" +
            "FROM iwc_tbl \n" +
            "WHERE iwc_public = 1\n" +
            "  AND (\n" +
            "  \tiwc_name LIKE CONCAT('%', :searchKeyword, '%') \n" +
            "  \tOR iwc_Explanation LIKE CONCAT('%', :searchKeyword, '%')\n" +
            "  \t)\n" +
            "  AND (\n" +
            "    (:timeRange = 'daily' AND iwc_date >= CURDATE() - INTERVAL 1 day)\n" +
            "    OR (:timeRange = 'weekly' AND iwc_date >= CURDATE() - INTERVAL 7 DAY)\n" +
            "    OR (:timeRange = 'monthly' AND iwc_date >= CURDATE() - INTERVAL 1 MONTH)\n" +
            "    OR (:timeRange = 'entire')\n" +
            "    OR (1=1)\n" +
            "  )\n" +
            "ORDER BY \n" +
            "  CASE \n" +
            "    WHEN :sortBy = 'views' THEN iwc_views\n" +
            "    WHEN :sortBy = 'popularity' THEN iwc_like \n" +
            "    WHEN :sortBy = 'new' THEN iwc_date \n" +
            "    else iwc_views\n" +
            "   end desc" ,nativeQuery = true)
    Page<IwcTbl> getListFilterSearch(@Param("searchKeyword") String searchKeyword,
                                     @Param("timeRange") String timeRange,
                                     @Param("sortBy") String sortBy,
                                     Pageable pageable);

//    Page<IwcTbl> findByIwcCodeGreaterThanAndIwcPublicEquals(long pNum, long ispub, Pageable pageable);


//    @Query(value = "select DATE(iwc_date),sum(iwc_complete) " +
//            "from iwc_tbl it  GROUP BY DATE(iwc_date) limit 15;" ,nativeQuery = true)
//    List<Object[]> periodPlayCupCnt();


//    Long countByIwcDateStartingWith(Timestamp iwcDate);
}


