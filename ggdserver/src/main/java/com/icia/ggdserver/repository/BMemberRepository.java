package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.BmemberTbl;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface BMemberRepository extends CrudRepository<BmemberTbl, String> {
    //사업자 회원용 Repository

    //아이디
    long countByBid(String b_id);

    //이메일
    long countByBemail (String b_email);

    @Query(value = "select m.bemail from BmemberTbl as m where m.bid=:bid")
    String selectMail(@Param("bid") String bid);

    BmemberTbl findByBemail(String bemail);
}
