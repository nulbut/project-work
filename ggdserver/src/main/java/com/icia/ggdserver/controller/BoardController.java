package com.icia.ggdserver.controller;

import com.icia.ggdserver.entity.BoardTbl;
import com.icia.ggdserver.service.BoardService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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
    public String boardWriteProc(@RequestPart(value = "data", required = true)BoardTbl board,
                                 @RequestPart(value = "files", required = false)List<MultipartFile> files,
                                 HttpSession session) {
        log.info("boardWriteProc()");
        String result = bServ.insertinquiry(board, files, session);
        return result;
    }
    //문의게시글 받기
    @GetMapping("getinquiry")
    public BoardTbl getinquiry(@RequestParam long boardCode){
        log.info("getinquiry()");
        return bServ.getBoard(boardCode);
    }
    //문의게시글 삭제
    @PostMapping("deleteInquiry")
    public Map<String, String> deleteInquiry(@RequestParam long boardCode,
                                             HttpSession session){
        log.info("deleteInquiry()");
        return bServ.deleteBoard(boardCode,session);
    }

}
