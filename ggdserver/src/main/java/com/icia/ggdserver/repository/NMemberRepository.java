package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.NmemberTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

    long findByNnickname(String n_nickname);

    long countByNname (String n_name);

    long countByNphonenum (String n_phonenum);

    long countByNemail (String n_email);
    NmemberTbl findByNemail(String nemail);

    //long Nsigndt (Timestamp n_signdt);

    long countByNstatus (String nStatus);

    //Page<NmemberTbl> findBySearch(String startDate, String endDate, Pageable pb);

    long countByNid(String nId);

    long countByNnickname(String nNickname);
}
