package com.icia.ggdserver.controller;

import com.icia.ggdserver.entity.BoardTbl;
import com.icia.ggdserver.service.BoardService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import java.util.List;
import java.util.Map;

@RestController
@Slf4j
public class BoardController {
    @Autowired
    private BoardService bServ;

    @GetMapping("boardlist")
    public Map<String, Object> getboardlist(@RequestParam Integer pageNum) {
        log.info("getboardlist");

        Map<String, Object> res = bServ.getBoardList(pageNum);

        return res;
    }

    @PostMapping("boardWriteProc")
    public String boardWriteProc(@RequestParam(value = "data", required = true)BoardTbl board,
                                 @RequestParam(value = "files", required = false)List<MultipartFile> files,
                                 HttpSession session) {
        log.info("boardWriteProc()");
        String result = bServ.insertinqiry(board, files, session);
        return result;
    }

}
