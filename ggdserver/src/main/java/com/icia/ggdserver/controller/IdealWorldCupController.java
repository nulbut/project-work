package com.icia.ggdserver.controller;


import com.icia.ggdserver.dto.GameVsDto;
import com.icia.ggdserver.dto.LikeRequest;
import com.icia.ggdserver.entity.IwcCommentTbl;
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
    public Map<String, Object> getList( @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
                                        @RequestParam(value = "searchKeyword", defaultValue = "") String searchKeyword,
                                        @RequestParam(value = "timeRange", defaultValue = "") String timeRange,
                                        @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                        @RequestParam(value = "nid", defaultValue = "") String nid){
        log.info("getList() - {} {}", pageNum,nid);

        Map<String, Object> res = iwcServ.getBoardList(pageNum, searchKeyword, timeRange, sortBy,nid);

        return res;
    }
    @GetMapping("listLike")
    public Map<String, Object> getListLike( @RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
                                        @RequestParam(value = "searchKeyword", defaultValue = "") String searchKeyword,
                                        @RequestParam(value = "timeRange", defaultValue = "") String timeRange,
                                        @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                        @RequestParam(value = "nid", defaultValue = "") String nid){
        log.info("getList() - {} {}", pageNum,nid);

        Map<String, Object> res = iwcServ.getBoardListLike(pageNum, searchKeyword, timeRange, sortBy,nid);

        return res;
    }

    @GetMapping("myGameList")
    public Map<String, Object> getMyGameList(@RequestParam(value = "pageNum", defaultValue = "1") Integer pageNum,
                                             @RequestParam(value = "searchKeyword", defaultValue = "") String searchKeyword,
                                             @RequestParam(value = "timeRange", defaultValue = "") String timeRange,
                                             @RequestParam(value = "sortBy", defaultValue = "") String sortBy,
                                             @RequestParam(value = "nid", defaultValue = "") String nid){
        log.info("getList() - {}", pageNum);

        Map<String, Object> res = iwcServ.getMyBoardList(pageNum, searchKeyword, timeRange, sortBy,nid);

        return res;
    }

    @GetMapping("getGameData")
    public List<IwcContentsTbl> getGameData(Long code){
        log.info("getGameData()",code);

        return iwcServ.getGameContent(code);
    }

    @PostMapping("/updateGameData")
    public void updateGameData(@RequestBody ArrayList<IwcContentsTbl> table){
//        for(IwcContentsTbl iwc : table){
//            log.info(String.valueOf(iwc.getIwcContentsIwcCode()));
//            log.info(iwc.getIwcContentsName());
//        }
        iwcServ.updateGameContent(table);

    }

    @PostMapping("/updateDeleteGameData")
    public void updateDeleteGameData(@RequestBody ArrayList<IwcContentsTbl> deleteGoods){
        for(IwcContentsTbl iwc : deleteGoods){
            log.info("iwc: {}", iwc.getIwcContentsCode());
        }
        iwcServ.updateDeleteGameContent(deleteGoods);

    }

    @GetMapping("/updateGameVs")
    public void updateGameVs( GameVsDto request){
        iwcServ.updateGameVs(request);
    }

    @PostMapping("deleteCup")
    public Map<String, String> deleteBoard(@RequestParam long iwccode,
                                           HttpSession session){
        log.info("deleteCup()");
        return iwcServ.deleteCup(iwccode, session);
    }

    @PostMapping("likeClicked")
    public void toggleLike(@RequestBody LikeRequest likeRequest) {
        // 클라이언트로부터 받은 데이터
        long iwcCode = likeRequest.getIwcCode();
        String likeNid = likeRequest.getLikeNid();
        boolean isLiked = likeRequest.isLiked(); // 현재 좋아요 상태)

        log.info("iwcCode: {}", iwcCode);
        log.info("likeNid: {}", likeNid);
        log.info("isLiked: {}", isLiked);

        iwcServ.toggleLike(iwcCode,likeNid,isLiked);
    }

    @GetMapping("getGameWinner")
    public Map<String, Object> getGameWinner(@RequestParam long iwcCode,
                                           @RequestParam long iwcContentsCode){
        log.info("getGameWinner()");
        return iwcServ.getGameWinner(iwcCode, iwcContentsCode);
    }

    @GetMapping("getAdList")
    public Map<String, Object> getAdList(@RequestParam String category){
        //임시로 이름 검색
        log.info("getAdList() {}",category);
        return iwcServ.getAdList(category);
    }

    @PostMapping("setIwcComments")
    public IwcCommentTbl addComment(@RequestBody IwcCommentTbl comment) {
        return iwcServ.addComment(comment);
    }

    @GetMapping("getIwcComments")
    public List<IwcCommentTbl> getCommentsByPost(@RequestParam Long postId) {
        return iwcServ.getCommentsByPost(postId);
    }

}
