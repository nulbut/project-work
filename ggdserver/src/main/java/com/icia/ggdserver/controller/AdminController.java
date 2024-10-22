package com.icia.ggdserver.controller;

import com.icia.ggdserver.entity.NmemberTbl;
import com.icia.ggdserver.repository.AdminRepository;
import com.icia.ggdserver.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService aServ;

    @PostMapping("id")
    public ResponseEntity<NmemberTbl> getMemberById(@RequestBody NmemberTbl nmemberTbl) {
        log.info("nid() n_id : {}", nmemberTbl.getNid());

        Map<String, String> rsMap = aServ.countByNid(nmemberTbl.getNid());
        return rsMap;

    }


//
//    @GetMapping("/members")
//    public ResponseEntity<Iterable<NmemberTbl>> getAllMembers() {
//        Iterable<NmemberTbl> members = aServ.findAll();
//        return ResponseEntity.ok(members);
//    }
//
//    @GetMapping("/count/nid/{n_id}")
//    public ResponseEntity<Long> countByNid(@PathVariable String n_id) {
//        return ResponseEntity.ok(aServ.countByNid(n_id));
//    }
//
//    @GetMapping("/count/name/{n_name}")
//    public ResponseEntity<Long> countByNname(@PathVariable String n_name) {
//        return ResponseEntity.ok(aServ.countByNname(n_name));
//    }
//
//    @GetMapping("/count/phonenum/{n_phonenum}")
//    public ResponseEntity<Long> countByNphonenum(@PathVariable String n_phonenum) {
//        return ResponseEntity.ok(aServ.countByNphonenum(n_phonenum));
//    }
//
//    @GetMapping("/count/email/{n_email}")
//    public ResponseEntity<Long> countByNemail(@PathVariable String n_email) {
//        return ResponseEntity.ok(aServ.countByNemail(n_email));
//    }
//
//    @GetMapping("/count/signdt/{n_signdt}")
//    public ResponseEntity<Long> countByNsigndt(@PathVariable Timestamp n_signdt) {
//        return ResponseEntity.ok(aServ.countByNsigndt(n_signdt));
//    }
//
//    @GetMapping("/count/status/{n_status}")
//    public ResponseEntity<Long> countByNstatus(@PathVariable String n_status) {
//        return ResponseEntity.ok(aServ.countByNstatus(n_status));
//    }
}