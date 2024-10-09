package com.icia.ggdserver.controller;

import com.icia.ggdserver.entity.nmemberTbl;
import com.icia.ggdserver.service.NMemberService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@Slf4j
public class NMemberController {
    @Autowired
    private NMemberService nmServ;

    @PostMapping("nidCheck")
    public Map<String,String> nidCheck(@RequestBody nmemberTbl nmemberTbl){
        log.info("nidCheck() mid : {}", nmemberTbl.getN_id());

        Map<String, String> rsMap = nmServ.nidCheck(nmemberTbl.getN_id());

        return rsMap;
    }

    //회원가입
}
