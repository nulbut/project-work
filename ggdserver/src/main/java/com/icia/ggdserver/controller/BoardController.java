package com.icia.ggdserver.controller;

import com.icia.ggdserver.entity.BoardTbl;
import com.icia.ggdserver.entity.ProductTbl;
import com.icia.ggdserver.entity.UsedProductTbl;
import com.icia.ggdserver.repository.ProductTblRepository;
import com.icia.ggdserver.service.BoardService;
import com.icia.ggdserver.service.ShoppingMallService;
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
public class BoardController {
    @Autowired
    private BoardService bServ;

   @Autowired
   private ShoppingMallService sServ;

   @Autowired
   private UsedShoppingService uServ;
    //문의 게시글 목록
    @GetMapping("boardlist")
    public Map<String, Object> getboardlist(@RequestParam Integer pageNum,
                                            @RequestParam String bnid) {
        log.info("getboardlist");

        Map<String, Object> res = bServ.getBoardList(pageNum, bnid);

        return res;
    }
    //문의 게시글 작성
    @PostMapping("boardWriteProc")
    public String boardWriteProc(@RequestPart(value = "data", required = true) BoardTbl board,
                                 @RequestPart(value = "files", required = false) List<MultipartFile> files,
                                 HttpSession session) {
        log.info("boardWriteProc()");

        String result = bServ.insertinquiry(board, files, session);
        return result;
    }
    // 상품 목록을 가져오는
    @GetMapping("products")
    public List<ProductTbl> getProducts() {
        return sServ.getAllProducts();  // 상품 목록을 반환
    }

    // 중고 상품 목록을 가져오는
    @GetMapping("usedProducts")
    public List<UsedProductTbl> getUsedProducts() {
        return uServ.getAllUsedProducts();  // 중고 상품 목록을 반환
    }
    //문의게시글 받기
    @GetMapping("getinquiry")
    public BoardTbl getinquiry(@RequestParam long boardCode){
        log.info("getinquiry()");
        return bServ.getBoard(boardCode);
    }
    // 상품명 조회 API
    @GetMapping("getProductName")
    public String getProductName(@RequestParam long productCode) {
        return bServ.getProductName(productCode);
    }

    // 중고 상품명 조회 API
    @GetMapping("getUsedProductName")
    public String getUsedProductName(@RequestParam long usedCode) {
        return bServ.getUsedProductName(usedCode);
    }
    //문의게시글 삭제
    @PostMapping("deleteInquiry")
    public Map<String, String> deleteInquiry(@RequestParam long boardCode,
                                             HttpSession session){
        log.info("deleteInquiry()");
        return bServ.deleteBoard(boardCode,session);
    }

}
