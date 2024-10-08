package com.icia.ggdserver.controller;


import com.icia.ggdserver.entity.IwcTbl;
import com.icia.ggdserver.service.IdealWorldCupService;
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
public class IdealWorldCupController {
    @Autowired
    private IdealWorldCupService iwcServ;

    @PostMapping("writeProc")
    public String writeProc(@RequestPart(value = "data", required = true) IwcTbl iwc,
                            @RequestPart(value = "files", required = false) List<MultipartFile> files,
                            HttpSession session){
        log.info("writeProc()");
        String result = iwcServ.insertIwc(iwc, files, session);
        return result;
    }
}
