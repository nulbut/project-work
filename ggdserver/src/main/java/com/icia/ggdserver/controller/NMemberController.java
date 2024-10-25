package com.icia.ggdserver.controller;

import com.icia.ggdserver.entity.BmemberTbl;
import com.icia.ggdserver.entity.NmemberTbl;
import com.icia.ggdserver.service.NMemberService;
import jakarta.mail.MessagingException;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Member;
import java.util.HashMap;
import java.util.Map;

@RequestMapping
@RestController
@Slf4j
public class NMemberController {
    @Autowired
    private NMemberService nmServ;

    //아이디 체크
    @PostMapping("nidCheck")
    public Map<String,String> nidCheck(@RequestBody NmemberTbl nmemberTbl){
        log.info("nidCheck() n_id : {}", nmemberTbl.getNid());

        Map<String, String> rsMap = nmServ.nidCheck(nmemberTbl.getNid());
        return rsMap;
    }



    //닉네임 체크
    @PostMapping("nnickCheck")
    public Map<String,String> nnickCheck(@RequestBody NmemberTbl nmemberTbl){
        log.info("nnickCheck() n_nickname : {}", nmemberTbl.getNnickname());

        Map<String, String> nrsMap = nmServ.nnickCheck(nmemberTbl.getNnickname());

        return nrsMap;
    }

    //회원가입
    @PostMapping("joinproc")
    public String joinproc(@RequestBody NmemberTbl nmemberTbl){
        log.info("joinproc()");
        String res = nmServ.joinMember(nmemberTbl);
        return res;
    }

    //로그인
    @PostMapping("loginproc")
    public Map<String, String> loginproc(@RequestBody NmemberTbl nmemberTbl){
        log.info("loginproc()");
        return nmServ.loginproc(nmemberTbl);
    }

    //닉네임 불러오기
    @GetMapping("getNickname")
    public NmemberTbl getNickname(@RequestParam long nnickname){
        log.info("getNickname()");
        return nmServ.getNickname(nnickname);


    }

    //이름 불러오기
    @GetMapping("getNName")
    public NmemberTbl getNName (@RequestParam String nname){
        log.info("getNName()");
        return nmServ.getNName(nname);
    }

    //아이디 불러오기
    @GetMapping("getNMember")
    public NmemberTbl getNMember(@RequestParam String nid){
        log.info("getNMember()");
        return nmServ.getNMember(nid);
    }

    //회원가입 이메일 인증
    @GetMapping("mailconfirm")
    public String mailconfirm (@RequestParam String nmail)
        throws MessagingException, UnsupportedEncodingException {
        log.info("mailconfirm() : {}", nmail);
        String authCode = nmServ.sendEmail(nmail);
        return authCode;
    }

    //비밀번호 인증
    @PostMapping("changepass")
    public String changepass(@RequestBody NmemberTbl nmemberTbl) {
        log.info("changepass() : {}", nmemberTbl.getNid());
        return nmServ.changepass(nmemberTbl);
    }
}
