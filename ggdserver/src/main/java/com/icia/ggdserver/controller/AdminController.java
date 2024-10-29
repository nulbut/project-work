package com.icia.ggdserver.controller;

import com.icia.ggdserver.dto.DateDto;
import com.icia.ggdserver.entity.NmemberTbl;
import com.icia.ggdserver.entity.NoticeTbl;
import com.icia.ggdserver.service.AdminService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService aServ;

    @GetMapping("/list")
    public Map<String, Object> getMemberList(DateDto dd) {
        log.info("getMemberList() startDate : {} ",  dd);

        Map<String, Object> rsMap = aServ.getMemberList(dd);
        return rsMap;

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



















//    @GetMapping("/blist")
//    public Map<String, Object> geteBmemberList(DateDto dd) {
//        log.info("getBmemberList() startDate : {}", dd.getPageNum());
//
//        Map<String, Object> rsMap = aServ.getBmemberList(dd);
//        return rsMap;
//    }



}