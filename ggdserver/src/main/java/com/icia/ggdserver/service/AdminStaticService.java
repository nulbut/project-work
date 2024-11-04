package com.icia.ggdserver.service;

import com.icia.ggdserver.repository.IwcContentsRepository;
import com.icia.ggdserver.repository.IwcTblRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@Service
@Slf4j
public class AdminStaticService {
    @Autowired
    private IwcTblRepository iwcRepo;

    @Autowired
    private IwcContentsRepository conRepo;

    Timestamp timestamp = new Timestamp(System.currentTimeMillis());
    SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd");

    public Map<String, Object> getBasicDashBoard() {
        Map<String,Object> res =new HashMap<>();

        long cupTotalCnt;
        long cupTodayCnt;

        cupTotalCnt = iwcRepo.count();
        cupTodayCnt = iwcRepo.countCupToday(sdf.format(timestamp));
        log.info(cupTotalCnt + " cup total");
        log.info(cupTodayCnt + " cup today");

        res.put("cupTotalCnt", cupTotalCnt);
        res.put("cupTodayCnt", cupTodayCnt);
        return res;
    }
}
