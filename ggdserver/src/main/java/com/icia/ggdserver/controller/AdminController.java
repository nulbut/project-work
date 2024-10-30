package com.icia.ggdserver.controller;

import com.icia.ggdserver.dto.DateDto;
import com.icia.ggdserver.entity.Member;
import com.icia.ggdserver.entity.NmemberTbl;
import com.icia.ggdserver.entity.UserGradeTbl;
import com.icia.ggdserver.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService aServ;

    @PostMapping("adminLoginProc")
    public Map<String, String> loginProc(@RequestBody Member member){
        log.info("loginProc()");
        return aServ.loginProc(member);
    }

    @GetMapping("/list")
    public Map<String, Object> getMemberList(DateDto dd) {
        log.info("getMemberList() startDate : {} ",  dd);

        Map<String, Object> rsMap = aServ.getMemberList(dd);
        return rsMap;

        }

    @GetMapping("/blist")
    public Map<String, Object> geteBmemberList(DateDto dd) {
        log.info("getBmemberList() startDate : {}", dd.getPageNum());

        Map<String, Object> rsMap = aServ.getBmemberList(dd);
        return rsMap;
    }

    @PostMapping("/writeGrade")
    public void writeGrade(@RequestBody ArrayList<UserGradeTbl> formFields){
//        for (UserGradeTbl formField : formFields) {
//            log.info(String.valueOf(formField.getUgId()));
//            log.info(formField.getUgName());
//            log.info(String.valueOf(formField.getUgDuration()));
//        }
        aServ.writeGradeProc(formFields);
    }
    @GetMapping("/gradeList")
    public ArrayList<UserGradeTbl> gradeList(){
        ArrayList<UserGradeTbl> rs = aServ.getGradeList();
        for (UserGradeTbl formField : rs) {
            log.info(String.valueOf(formField.getUgId()));
            log.info(formField.getUgName());
            log.info(String.valueOf(formField.getUgDuration()));
        }
        return rs;
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