package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.NmemberTbl;
import com.icia.ggdserver.repository.AdminRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository aRepo;

    public long countByNid(String n_id) {
        return aRepo.countByNid(n_id);
    }

    public Optional<NmemberTbl> findById(Long id) {
    }
//
//    public long countByNname(String n_name) {
//        return aRepo.countByNname(n_name);
//    }
//
//    public long countByNphonenum(String n_phonenum) {
//        return aRepo.countByNphonenum(n_phonenum);
//    }
//
//    public long countByNemail(String n_email) {
//        return aRepo.countByNemail(n_email);
//    }
//
//    public long countByNsigndt(Timestamp n_signdt) {
//        return aRepo.countByNSigndt(n_signdt);
//    }
//
//    public long countByNstatus(String n_status) {
//        return aRepo.countByNStatus(n_status);
//    }


}
