package com.icia.ggdserver.service;

import com.icia.ggdserver.dto.IwcCategoryCntDto;
import com.icia.ggdserver.repository.BMemberRepository;
import com.icia.ggdserver.repository.IwcContentsRepository;
import com.icia.ggdserver.repository.IwcTblRepository;
import com.icia.ggdserver.repository.NMemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class AdminStaticService {
    @Autowired
    private IwcTblRepository iwcRepo;

    @Autowired
    private IwcContentsRepository conRepo;

    @Autowired
    private NMemberRepository nmRepo;

    @Autowired
    private BMemberRepository bmRepo;

    Timestamp timestamp = new Timestamp(System.currentTimeMillis());
    SimpleDateFormat sdf = new SimpleDateFormat ("yyyy-MM-dd");

    public Map<String, Object> getBasicDashBoard() {
        Map<String,Object> res =new HashMap<>();

        long cupTotalCnt;
        long cupTodayCnt;
        long nmemberTotalCnt;
        long nmemberTodayCnt;
        long bmemberTotalCnt;
        long bmemberTodayCnt;

        cupTotalCnt = iwcRepo.count();
        cupTodayCnt = iwcRepo.countCupToday(sdf.format(timestamp));
        nmemberTotalCnt = nmRepo.count();
        nmemberTodayCnt = nmRepo.countMemberToday(sdf.format(timestamp));
        bmemberTotalCnt = bmRepo.count();
        bmemberTodayCnt = bmRepo.countMemberToday(sdf.format(timestamp));

        log.info(cupTotalCnt + " cup total");
        log.info(cupTodayCnt + " cup today");
        List<Object[]> results = conRepo.categoryCnt();
        List<Object[]> period = iwcRepo.periodMakeCupCnt();




        res.put("cupTotalCnt", cupTotalCnt);
        res.put("cupTodayCnt", cupTodayCnt);
        res.put("cCnt", results);
        res.put("periodMakeCup", period);
        res.put("nmemberTotalCnt", nmemberTotalCnt);
        res.put("nmemberTodayCnt", nmemberTodayCnt);
        res.put("bmemberTotalCnt", bmemberTotalCnt);
        res.put("bmemberTodayCnt", bmemberTodayCnt);

        return res;
    }
}
