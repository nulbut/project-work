package com.icia.ggdserver.controller;

import com.icia.ggdserver.entity.BproductTbl;
import com.icia.ggdserver.service.BproductService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;


@RestController
@Slf4j
public class BproductController {
    @Autowired
    private BproductService bpServ;

    @PostMapping("bpdwriteProc")
    public String bpdwriteProc (@RequestPart(value = "data", required = true) BproductTbl bproductTbl,
                                @RequestPart(value = "files", required = false) List<MultipartFile> files,
                                HttpSession session) {
        log.info("bpdwriteProc()");
        String result = bpServ.insertBproduct(bproductTbl, files, session);

        return result;
    }
}

