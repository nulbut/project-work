package com.icia.ggdserver.controller;

import com.icia.ggdserver.entity.BproductFileTbl;
import com.icia.ggdserver.entity.BproductTbl;
import com.icia.ggdserver.entity.IwcContentsTbl;
import com.icia.ggdserver.service.BproductService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
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
                                @RequestPart(value = "files", required = false) List<MultipartFile> bfiles,
                                HttpSession session) {
        log.info("bpdwriteProc()",bfiles);
        String bresult = bpServ.insertBproduct(bproductTbl, bfiles, session);

        return bresult;
    } //bpdwriteProc end

    //상품 수정
    @PostMapping("bproductupdate")
    public String bproductupdate (@RequestPart(value = "data", required = true) BproductTbl bproductTbl,
                                  @RequestPart(value = "files", required = false) List<MultipartFile> bupdatefiles,
                                  HttpSession session){
        log.info("bproductupdate()",bupdatefiles);
        String updatesult = bpServ.updateBproduct(bproductTbl, bupdatefiles, session);

        return updatesult;
    }


    //상품 불러오기
    @GetMapping("getBproduct")
    public BproductTbl getBproduct(@RequestParam long bpnum){
        log.info("getBproduct()");
        return bpServ.getBproduct(bpnum);
    } //getBproduct end


    // 체크삭제
    @PostMapping("bpdCheckedDelete")
    public String bpdCheckedDelete(@RequestParam List<Long> ckList, HttpSession session){
        log.info("bpdCheckedDelete()");
        String result = bpServ.deleteCheckedList(ckList, session);
        return result;
    }

    //상품 삭제
    @PostMapping("bpdDelete")
    public Map<String, String> bpdDelete(@RequestParam long bpnum,
                                         HttpSession session) throws Exception {
        log.info("bpdDelete()");
        return bpServ.bpdDelete(bpnum, session);
    }//bpdDelete end





    //마이페이지 등록한 상품
    @GetMapping("BproductList")
    public Map<String, Object> getBproductList(@RequestParam Integer bpageNum,
                                            @RequestParam String bsellerId){
        log.info("BproductList() - {}", bpageNum);
        Map<String, Object> res = bpServ.getBproductList(bpageNum, bsellerId);
        return res;
    }



}

