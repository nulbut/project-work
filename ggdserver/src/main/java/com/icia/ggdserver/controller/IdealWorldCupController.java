package com.icia.ggdserver.controller;


import com.icia.ggdserver.dto.GameVsDto;
import com.icia.ggdserver.entity.IwcContentsTbl;
import com.icia.ggdserver.entity.IwcTbl;
import com.icia.ggdserver.service.IdealWorldCupService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

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

    @GetMapping("list")
    public Map<String, Object> getList(Integer pageNum){
        log.info("getList() - {}", pageNum);

        Map<String, Object> res = iwcServ.getBoardList(pageNum);

        return res;
    }

    @GetMapping("myGameList")
    public Map<String, Object> getMyGameList(Integer pageNum, String id){
        log.info("getList() - {}", pageNum);

        Map<String, Object> res = iwcServ.getMyBoardList(pageNum,id);

        return res;
    }

    @GetMapping("getGameData")
    public List<IwcContentsTbl> getGameData(Long code){
        log.info("getGameData()",code);

        return iwcServ.getGameContent(code);
    }

    @PostMapping("/updateGameData")
    public void updateGameData(@RequestBody ArrayList<IwcContentsTbl> table){
        for(IwcContentsTbl iwc : table){
            log.info(String.valueOf(iwc.getIwcContentsIwcCode()));
            log.info(iwc.getIwcContentsName());
        }
        iwcServ.updateGameContent(table);

    }

    @GetMapping("/updateGameVs")
    public void updateGameVs( GameVsDto request){
        iwcServ.updateGameVs(request);
    }
}
