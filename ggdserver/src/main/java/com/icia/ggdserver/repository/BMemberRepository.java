package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.BmemberTbl;
import com.icia.ggdserver.entity.NmemberTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface BMemberRepository extends CrudRepository<BmemberTbl, String> {
    //사업자 회원용 Repository



    Page<BmemberTbl> findAll(Pageable pb);

    //아이디
    BmemberTbl findByBemail(String bemail);
    long countByBid(String nid);

    //이메일
    long countByBemail (String b_email);


    @Query(value = "select m.bemail from BmemberTbl as m where m.bid=:bid")
    String selectMail(@Param("bid") String bid);

    @Query(value = "select count(*) " +
            "from bmember_tbl where n_signdt like concat( :date , '%') " ,nativeQuery = true)
    Long countMemberToday(@Param(value = "date") String date );

}
