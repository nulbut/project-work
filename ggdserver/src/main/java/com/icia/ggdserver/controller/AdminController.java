package com.icia.ggdserver.controller;

import com.icia.ggdserver.dto.DateDto;

import com.icia.ggdserver.entity.*;
import com.icia.ggdserver.repository.UproductReviewTblRepository;
import com.icia.ggdserver.service.AdminService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
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
    public Map<String, Object> getBmemberList(DateDto dd) {
        log.info("getBmemberList() startDate : {} ", dd);

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

    @GetMapping("/getNotice")
    public NoticeTbl getNotice(@RequestParam long nnum){
        log.info("getNotice()");
        return aServ.getNotice(nnum);
    }

    @PostMapping("/deleteNotice")
    public Map<String, String> deleteNotice(@RequestParam long nnum,
                                            HttpSession session){
        log.info("`deleteNotice()");
        return aServ.deleteNotice(nnum, session);
    }

    @GetMapping("/report")
    public Map<String, Object> getReportList(@RequestParam Integer pageNum){
        log.info("getRList()");

        Map<String, Object> res = aServ.getReportList(pageNum);
        return res;
    }

    @GetMapping("/getReport")
    public ReportTbl getReport(@RequestParam long rNum){
        log.info("getReport()");
        return aServ.getReport(rNum);
    }

    @GetMapping("/rpUpdate")
    public String rpUpdate(@RequestParam long rNum){
        log.info("rpUpdate()");
        return aServ.rpUpdate(rNum);
    }

    @GetMapping("/dm")
    public Map<String, Object> getDmList(@RequestParam Integer pageNum){
        log.info("getDList()");

        Map<String, Object> res = aServ.getDList(pageNum);
        return res;
    }

    @GetMapping("/getDm")
    public DmsgTbl getDm(@RequestParam long dnum){
        log.info("getDm()");
        return aServ.getDmList(dnum);
    }

    @PostMapping("/dComment")
    public String getComment(@RequestBody DmsgTbl directmsg){
        log.info("getComment()");
        return aServ.getComment(directmsg);
    }

    @GetMapping("/getrvlist")
    public List<UproductReviewTbl> getrvList(){
        log.info("getrvList()");
        return aServ.getrvList();
    }

    @PostMapping("/deleterv")
    public Map<String, String> deletereview(@RequestParam long uNum){
        log.info("deletereview()");
        return aServ.deletereview(uNum);

    }
}