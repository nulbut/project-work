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

    @GetMapping("pdlist")
    public Map<String, Object> getpdList(Integer pageNum){
        log.info("getpdList() - {}", pageNum);

        Map<String, Object> res= spmServ.BoardList(pageNum);


        return res;
    }
}
