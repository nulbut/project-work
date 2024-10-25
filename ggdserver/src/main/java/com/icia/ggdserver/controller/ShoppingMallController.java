package com.icia.ggdserver.controller;

import com.icia.ggdserver.entity.ProductTbl;
import com.icia.ggdserver.service.ShoppingMallService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

@RestController
@Slf4j
public class ShoppingMallController {
    @Autowired
    private ShoppingMallService spmServ;

    @PostMapping("pdwriteProc")
    public String pdwriteProc(@RequestPart(value = "data", required = true) ProductTbl pdt,
                              @RequestPart(value = "files", required = false) List<MultipartFile> files,
                              HttpSession session) {
        log.info("pdwriteProc()");
        String result = spmServ.insertSpm(pdt, files, session);
        return result;
    }

    @GetMapping("getBoard")
    public ProductTbl getBoard(@RequestParam long productCode){
        log.info("getBoard()");
        return spmServ.getBoard(productCode);
    }

    @PostMapping("boardDelete")
    public Map<String, String> boardDelete(@RequestParam long productCode,
                                           HttpSession session) throws Exception {
        log.info("boardDelete()");
        return spmServ.boardDelete(productCode, session);
    }

    @GetMapping("BoardList")
    public Map<String, Object> BoardList(@RequestParam Integer pageNum){
        log.info("getBoardList() - {}", pageNum);

        Map<String, Object> res= spmServ.getBoardList(pageNum);


        return res;
    }
    //상품등록글 받기
    @GetMapping("getproduct")
    public ProductTbl getproduct(@RequestParam long productCode){
        log.info("getproduct()");
        return spmServ.getBoard(productCode);
    }
    //상품등록글 삭제
    @PostMapping("deleteProduct")
    public Map<String, String> deleteProduct(@RequestParam long productCode,
                                             HttpSession session){
        log.info("deleteProduct()");
        return spmServ.boardDelete(productCode, session);
    }
}
