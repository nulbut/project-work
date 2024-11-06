package com.icia.ggdserver.controller;

import com.icia.ggdserver.service.DibsService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;
import java.util.Map;

@RestController
@Slf4j
public class DibsController {

    @Autowired
    private DibsService dServ;

    @GetMapping("dibslist")
    public Map<String, Object> getdibslist(@RequestParam Integer pageNum,
                                            @RequestParam String dnid) {
        log.info("getdibslist");

        Map<String, Object> res = dServ.getDibsList(pageNum, dnid);

        return res;
    }
    @GetMapping("setDibs")
    public String setDibs(@RequestParam String dnid,
                          @RequestParam(required = false) Long usedCode) {
        try {
            log.info("setDibs 호출: dnid = {}, usedCode = {}", dnid, usedCode);

            // 파라미터가 없으면 에러 처리
            if (usedCode == null) {
                return "error: Missing required parameter (usedCode)"; // 필수 파라미터가 없을 경우 에러 메시지 반환
            }

            // 찜에 상품 추가 처리
            return dServ.getDibs(dnid, usedCode); // productCode는 null로 전달
        } catch (Exception e) {
            log.error("Error while adding dibs: {}", e.getMessage());
            return "error: An error occurred while adding the dibs item.";
        }
    }


    @PostMapping("deleteDibs")
    public String deleteDibs(@RequestBody List<Long> dibsCodes){
        try {
            dServ.deletMultioleDibss(dibsCodes);
            return "ok";
        } catch (Exception e){
            e.printStackTrace();
            return "error";
        }
    }
}
