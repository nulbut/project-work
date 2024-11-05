package com.icia.ggdserver.service;

import com.icia.ggdserver.dto.IwcCategoryCntDto;
import com.icia.ggdserver.entity.NoticeTbl;
import com.icia.ggdserver.repository.*;
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

    @Autowired
    private NoticeRepository noRepo;

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
        List<Object[]> nmemberPeriodCnt = nmRepo.countMemberPeriod();

        bmemberTotalCnt = bmRepo.count();
        bmemberTodayCnt = bmRepo.countMemberToday(sdf.format(timestamp));



        List<Object[]> results = conRepo.categoryCnt();
        List<Object[]> period = iwcRepo.periodMakeCupCnt();
//        List<Object[]> periodplay = iwcRepo.periodPlayCupCnt();

        List<NoticeTbl> pinnedNotice = noRepo.findAllByIsPinned(1);





        res.put("cupTotalCnt", cupTotalCnt);
        res.put("cupTodayCnt", cupTodayCnt);
//        res.put("periodPlay", periodplay);
        res.put("cCnt", results);
        res.put("periodMakeCup", period);
        res.put("nmemberTotalCnt", nmemberTotalCnt);
        res.put("nmemberTodayCnt", nmemberTodayCnt);
        res.put("nmemberPeriodCnt",nmemberPeriodCnt);
        res.put("bmemberTotalCnt", bmemberTotalCnt);
        res.put("bmemberTodayCnt", bmemberTodayCnt);

        res.put("pinnedNotice", pinnedNotice);

        return res;
    }
}
