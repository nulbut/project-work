package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.BmemberTbl;
import org.springframework.data.repository.CrudRepository;

public interface BMemberRepository extends CrudRepository<BmemberTbl, String> {
    //사업자 회원용 Repository

    long countByBid(String b_id);
}
