package com.icia.ggdserver.controller;


import com.icia.ggdserver.entity.BmemberTbl;
import com.icia.ggdserver.entity.NmemberTbl;
import com.icia.ggdserver.service.BMemberSevrvice;
import com.icia.ggdserver.service.NMemberService;
import jakarta.mail.MessagingException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.util.Map;

@RestController
@Slf4j
public class BMemberController {
    @Autowired
    private BMemberSevrvice bmServ;

    //아이디 체크
    @PostMapping("bidCheck")
    public Map<String,String> bidCheck(@RequestBody BmemberTbl bmemberTbl){
        log.info("bidCheck() b_id : {}", bmemberTbl.getBid());

        Map<String, String> rsMap = bmServ.bidCheck(bmemberTbl.getBid());
        return rsMap;
    }


//    //회원가입
    @PostMapping("bjoinproc")
    public String bjoinproc(@RequestBody BmemberTbl bmemberTbl){
        log.info("bjoinproc()");
        String res = bmServ.joinBMember(bmemberTbl);
        return res;

    }

    //로그인
    @PostMapping("bloginproc")
    public Map<String, String> bloginproc(@RequestBody BmemberTbl bmemberTbl){
        log.info("bloginproc()");
        return bmServ.bloginproc(bmemberTbl);
    }

    //아이디 불러오기
    @GetMapping("getBMemeber")
    public BmemberTbl getBMemeber(@RequestParam String bid){
        log.info("getBMemeber()");
        return bmServ.getBMemeber(bid);
    }

    //회원가입 이메일 인증
    @GetMapping("bmailconfirm")
    public String bmailconfirm (@RequestParam String bmail)
        throws MessagingException, UnsupportedEncodingException {
        log.info("bmailconfirm() : {}", bmail);
        String bauthCode = bmServ.sendBEmail(bmail);
        return bauthCode;
    }

    //비밀번호 인증
    @PostMapping("bchangepass")
    public String bchangepass(@RequestBody BmemberTbl bmemberTbl) {
        log.info("bchangepass() : {}", bmemberTbl.getBid());
        return bmServ.bchangepass(bmemberTbl);
    }


}//class end
