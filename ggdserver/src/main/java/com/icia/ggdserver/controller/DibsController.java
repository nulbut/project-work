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
                          @RequestParam long productCode) {
        return dServ.getDibs(dnid,productCode);
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
