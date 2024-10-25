package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.NmemberTbl;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface NMemberRepository extends CrudRepository<NmemberTbl, String> {
    //일반 회원용 Repository

    //아이디
    long countByNid(String n_id);
    //닉네임
    long countByNnickname(String n_nickname);

    //이메일
    long countByNemail(String n_email);
    @Query(value = "select m.nemail from NmemberTbl as m where m.nid=:nid")
    String selectMail(@Param("nid") String nid);
}
