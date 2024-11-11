
package com.icia.ggdserver.repository;


import com.icia.ggdserver.entity.BmemberTbl;
import com.icia.ggdserver.entity.NmemberTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BMemberRepository extends CrudRepository<BmemberTbl, String> {
    //사업자 회원용 Repository


    Page<BmemberTbl> findAll(Pageable pb);

    //아이디
    BmemberTbl findByBemail(String bemail);

    long countByBid(String bid);

    //이메일
    long countByBemail (String b_email);

    @Query(value = "select m.bemail from BmemberTbl as m where m.bid=:bid")
    String selectMail(@Param("bid") String bid);

    @Query(value = "select count(*) " +
            "from bmember_tbl where b_signdt like concat( :date , '%') " ,nativeQuery = true)
    Long countMemberToday(@Param(value = "date") String date );


    //long findById(String n_id);

//    long findByNnickname(String n_nickname);

    BmemberTbl findByBcname(String bcname);

    long countByBname (String b_name);

    long countByBphonenum (String b_phonenum);



    //long Nsigndt (Timestamp n_signdt);

    long countByBstatus (String bStatus);

    //Page<NmemberTbl> findBySearch(String startDate, String endDate, Pageable pb);


    long countByBcname(String bCname);

    Page<BmemberTbl> findByBid(String searchKeyword, Pageable pb);

    Page<BmemberTbl> findByBname(String searchKeyword, Pageable pb);

    @Query(value = "select * from bmember_tbl where b_name = :bname and b_signdt between :sdate and :edate", nativeQuery = true)
    Page<BmemberTbl> searchByBnameAndBsigndt(@Param(value = "bname") String searchKeyword,
                                             @Param(value = "sdate") String startDate,
                                             @Param(value = "edate") String endDate,
                                             Pageable pb);

    @Query(value = "select * from bmember_tbl where b_signdt >= :sdate or b_signdt <= :edate", nativeQuery = true)
    Page<BmemberTbl> searchByBsigndt(@Param(value = "sdate") String startDate,
                                     @Param(value = "edate") String endDate,
                                     Pageable pb);

//    //회원삭제 메소드
//    void deleteByBId(long bid);
}