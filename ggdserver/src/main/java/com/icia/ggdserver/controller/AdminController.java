package com.icia.ggdserver.controller;

import com.icia.ggdserver.dto.DateDto;
import com.icia.ggdserver.entity.Member;
import com.icia.ggdserver.entity.UserGradeTbl;
import com.icia.ggdserver.service.AdminStaticService;
import com.icia.ggdserver.service.AdminService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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


}