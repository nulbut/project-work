package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.BmemberTbl;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface BMemberRepository extends CrudRepository<BmemberTbl, String> {
    //사업자 회원용 Repository

    long countByBid(String b_id);

    @Query(value = "select m.bemail from BmemberTbl as m where m.bid=:bid")
    String selectMail(@Param("bid") String bid);
}
