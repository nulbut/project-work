package com.icia.ggdserver.controller;


import com.icia.ggdserver.entity.BmemberTbl;
import com.icia.ggdserver.entity.NmemberTbl;
import com.icia.ggdserver.service.BMemberSevrvice;
import com.icia.ggdserver.service.NMemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

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
//    @PostMapping("loginproc")
}//class end
