package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.NmemberTbl;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface NMemberRepository extends CrudRepository<NmemberTbl, String> {
    //일반 회원용 Repository

    long countByNid(String n_id);

    long countByNnickname(String n_nickname);
}
