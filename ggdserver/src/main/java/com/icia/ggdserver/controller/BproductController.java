package com.icia.ggdserver.controller;

import com.icia.ggdserver.entity.BproductTbl;
import com.icia.ggdserver.service.BproductService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;


@RestController
@Slf4j
public class BproductController {
    @Autowired
    private BproductService bpServ;

    //상품 등록
    @PostMapping("bpdwriteProc")
    public String bpdwriteProc (@RequestPart(value = "data", required = true) BproductTbl bproductTbl,
                                @RequestPart(value = "bfiles", required = false) List<MultipartFile> bfiles,
                                HttpSession session) {
        log.info("bpdwriteProc()");
        String bresult = bpServ.insertBproduct(bproductTbl, bfiles, session);

        return bresult;
    } //bpdwriteProc end

    //상품 불러오기
    @GetMapping("getBproduct")
    public BproductTbl getBproduct(@RequestParam long bpnum){
        log.info("getBproduct()");
        return bpServ.getBproduct(bpnum);
    } //getBproduct end


    //상품 삭제
    @PostMapping("bpdDelete")
    public Map<String, String> bpdDelete(@RequestParam long bpnum,
                                         HttpSession session) throws Exception {
        log.info("bpdDelete()");
        return bpServ.bpdDelete(bpnum, session);
    }//bpdDelete

//    @GetMapping("BproductList")
//    public Map<String, Object> BproductList(@RequestParam Integer bpageNum){
//        log.info("BproductList() - {}",bpageNum);
//
//        Map<String, Object> res = bpServ.getBproductList(bpageNum);
//
//        return res;
//    }


}
