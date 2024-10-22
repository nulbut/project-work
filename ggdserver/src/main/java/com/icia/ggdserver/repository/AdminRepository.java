package com.icia.ggdserver.repository;


import com.icia.ggdserver.entity.NmemberTbl;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.sql.Timestamp;

@Repository
public interface AdminRepository extends CrudRepository<NmemberTbl, Long> {
    //관리자 repository

    long countByNid (String n_id);

//    long countByNname(String n_name);
//
//    long countByNphonenum (String n_phonenum);
//
//    long countByNemail (String n_email);
//
//    long countByNSigndt  (Timestamp nSigndt);
//
//
//    long countByNStatus (String nStatus);
}
