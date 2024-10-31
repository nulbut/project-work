package com.icia.ggdserver.controller;

import com.icia.ggdserver.dto.DateDto;
import com.icia.ggdserver.entity.Member;
import com.icia.ggdserver.entity.NmemberTbl;
import com.icia.ggdserver.entity.UserGradeTbl;
import com.icia.ggdserver.entity.NoticeTbl;
import com.icia.ggdserver.service.AdminService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

 @GetMapping("/notice")
    public Map<String, Object> getNoticeList(@RequestParam Integer pageNum){
        log.info("getNList()");

        Map<String, Object> res = aServ.getNoticeList(pageNum);
        return res;
        }

        @PostMapping("/writeProc")
    public String writeProc(@RequestPart(value = "data", required = true) NoticeTbl notice,
                            @RequestPart(value = "files", required = false) List<MultipartFile> files,
                            HttpSession session){
        log.info("writeProc()");
        String result = aServ.insertNotice(notice, files, session);
        return  result;
        }

        @GetMapping("getNotice")
    public NoticeTbl getNotice(@RequestPart long nnum){
        log.info("getNotice()");
        return aServ.getNotice(nnum);
        }




}