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

//    @GetMapping("getproduct")
//    public ProductTbl getBoard(@RequestParam long productCode,
//                               @RequestParam long productFileNum) {
//        log.info("getproduct()");
//        return spmServ.getBoard(productCode, productFileNum);
//    }

    @PostMapping("boardDelete")
    public Map<String, String> boardDelete(@RequestParam long productCode,
                                           HttpSession session) throws Exception {
        log.info("boardDelete()");
        return spmServ.boardDelete(productCode, session);
    }
    //마이페이지 등록한 상품
    @GetMapping("ProductList")
    public Map<String, Object> getProductList(@RequestParam Integer pageNum,
                                              @RequestParam String sellerId){
        log.info("getProductList() - {}", pageNum);

        Map<String, Object> res= spmServ.getProductList(pageNum, sellerId);

        return res;
    }
    // 메인 무한 스크롤
    @GetMapping("productList")
    public Map<String, Object> getProductList(@RequestParam Integer pageNum){
        log.info("getProductList() - {}", pageNum);

        Map<String, Object> res= spmServ.getproductList(pageNum);

        return res;
    }

    @GetMapping("bpdList")
    public Map<String, Object> bpdList(@RequestParam Integer pageNum){
        log.info("getBoardList() - {}", pageNum);
        Map<String, Object> res = spmServ.getbpdList(pageNum);
        return res;
    }


    //상품등록글 받기
    @GetMapping("getproduct")
    public ProductTbl getproduct(@RequestParam long productCode){
        log.info("getproduct()");
        return spmServ.getProduct(productCode);
    }
    //상품등록글 삭제
    @PostMapping("deleteProduct")
    public Map<String, String> deleteProduct(@RequestParam long productCode,
                                             HttpSession session){
        log.info("deleteProduct()");
        return spmServ.boardDelete(productCode, session);
    }
}
