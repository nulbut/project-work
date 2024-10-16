package com.icia.ggdserver.controller;

import com.icia.ggdserver.service.BoardService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.util.Map;

@RestController
@Slf4j
public class BoardController {
    @Autowired
    private BoardService bServ;

    @GetMapping("boardlist")
    public Map<String, Object> getboardlist(@RequestParam Integer pageNum) {
        log.info("getboardlist() - {}", pageNum)
        ;

        Map<String, Object> res = bServ.getBoardList(pageNum);

        return res;
    }

}
