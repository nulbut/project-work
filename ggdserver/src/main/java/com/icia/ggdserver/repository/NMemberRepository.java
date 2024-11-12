package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.NmemberTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;
import java.util.List;

@Repository
public interface NMemberRepository extends CrudRepository<NmemberTbl, String> {
    //일반 회원용 Repository

    //Page<NmemberTbl> findAll(Pageable pd);
    Page<NmemberTbl> findAll(Pageable pb);

    //long findById(String n_id);

//    long findByNnickname(String n_nickname);

    NmemberTbl findByNnickname(String nnick);

    long countByNname (String n_name);

    long countByNphonenum (String n_phonenum);

    long countByNemail (String n_email);
    NmemberTbl findByNemail(String nemail);

    //long Nsigndt (Timestamp n_signdt);

    long countByNstatus (String nStatus);

    //Page<NmemberTbl> findBySearch(String startDate, String endDate, Pageable pb);

    long countByNid(String nid);

    long countByNnickname(String nNickname);

    Page<NmemberTbl> findByNid(String searchKeyword, Pageable pb);

    Page<NmemberTbl> findByNname(String searchKeyword, Pageable pb);

    @Query(value = "select * from nmember_tbl where n_name = :nname and n_signdt between :sdate and :edate", nativeQuery = true)
    Page<NmemberTbl> searchByNnameAndNsigndt(@Param(value = "nname") String searchKeyword,
                                             @Param(value = "sdate") String startDate,
                                             @Param(value = "edate") String endDate,
                                             Pageable pb);

    @Query(value = "select * from nmember_tbl where n_signdt >= :sdate or n_signdt <= :edate", nativeQuery = true)
    Page<NmemberTbl> searchByNsigndt(@Param(value = "sdate") String startDate,
                                     @Param(value = "edate") String endDate,
                                     Pageable pb);

    @Query(value = "select count(*) " +
            "from nmember_tbl where n_signdt like concat( :date , '%') " ,nativeQuery = true)
    Long countMemberToday(@Param(value = "date") String date );

@Query(value = "SELECT \n" +
        "    dates.date,\n" +
        "    IFNULL(count(t.n_signdt), 0) AS amount\n" +
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
        "LEFT JOIN nmember_tbl t\n" +
        "    ON dates.date = date(t.n_signdt)\n" +
        "    GROUP BY dates.date\n" +
        "ORDER BY dates.date ASC; " ,nativeQuery = true)
    List<Object[]> countMemberPeriod();

////회원삭제 메소드
    @Modifying
    @Query(value = "update NmemberTbl nt set nt.nsituation = '탈퇴' where nt.nid = :ncon")
    void deleteByNMember (@Param("ncon") String ncon);
    }
