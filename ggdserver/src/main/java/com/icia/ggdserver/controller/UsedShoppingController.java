package com.icia.ggdserver.controller;

import com.icia.ggdserver.entity.UsedProductTbl;
import com.icia.ggdserver.service.UsedShoppingService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
public class UsedShoppingController {
    @Autowired
    private UsedShoppingService uptServ;

    @PostMapping("usedwriteProc")
    public String usedwriteProc(@RequestPart(value = "data", required = true) UsedProductTbl upt,
                                @RequestPart(value = "files", required = false) List<MultipartFile> files,
                                HttpSession session) {
        log.info("usedwriteProc()");
        String result = uptServ.insertUsed(upt, files, session);
        return result;
    }

    //중고 등록한 상품
    @GetMapping("UsedList")
    public Map<String, Object> getusedList(@RequestParam Integer pageNum,
                                           @RequestParam String usedsellerId){
        log.info("getUsedList() - {}", pageNum);

        Map<String, Object> res = uptServ.getUsedList(pageNum, usedsellerId);

        return res;
    }

    // 중고 무한 스크롤
    @GetMapping("usedList")
    public Map<String, Object> getUsedList(@RequestParam Integer pageNum){
        log.info("getUsedList() - {}", pageNum);

        Map<String, Object> res = uptServ.getusedList(pageNum);

        return res;
    }


    @GetMapping("getusedBoard")
    public UsedProductTbl getusedBoard(@RequestParam long usedCode){
        log.info("getusedBoard()");
        return uptServ.getUsedBoard(usedCode);
    }
    //중고상품등록 글 받기
    @GetMapping("getusedproduct")
    public UsedProductTbl getusedproduct(@RequestParam long usedCode){
        log.info("getusedproduct()");
        return uptServ.getUsedBoard(usedCode);
    }
    //중고상품등록 글 삭제
    @PostMapping("deleteusedProduct")
    public Map<String, String> deleteusedProduct(@RequestParam long usedCode,
                                                 HttpSession session){
        log.info("deleteusedProduct()");
        return uptServ.usedDelete(usedCode, session);
    }
}
