package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.nmemberTbl;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NMemberRepository extends CrudRepository<nmemberTbl, String> {
    //일반 회원용 Repository

    long countByn_id(String n_id);
}
