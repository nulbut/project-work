package com.icia.ggdserver.controller;

import com.icia.ggdserver.service.AdminService;
import com.icia.ggdserver.service.AdminStaticService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
public class AdminStaticController {
    @Autowired
    private AdminService aServ;

    @Autowired
    private AdminStaticService atServ;

    //대시보드 관련
    @GetMapping("/getDashBoard")
    public Map<String,Object> getDashBoard(){
        Map<String,Object> res = atServ.getBasicDashBoard();

        return res;
    }

    @GetMapping("/idlecuplist")
    public Map<String, Object> getList(Integer pageNum){
        log.info("getList() - {}", pageNum);

        Map<String, Object> res = atServ.getIdealBoardList(pageNum);

        return res;
    }
}
