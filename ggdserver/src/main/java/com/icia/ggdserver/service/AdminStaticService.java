package com.icia.ggdserver.service;

import com.icia.ggdserver.dto.IwcCategoryCntDto;
import com.icia.ggdserver.entity.IwcTbl;
import com.icia.ggdserver.entity.NoticeTbl;
import com.icia.ggdserver.entity.ReportTbl;
import com.icia.ggdserver.repository.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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

    @Autowired
    private ReportRepository repRepo;

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

    public Map<String, Object> getIdealBoardList(Integer pNum) {
        log.info("getBoardList()");

        if(pNum == null){
            pNum = 1;
        }

        //페이지 당 보여질 게시글 개수
        int listCnt = 16;

        //페이징 조건 처리 객체 생성(Pageable)
        Pageable pb = PageRequest.of((pNum - 1), listCnt,
                Sort.Direction.DESC, "iwcCode");
        //PageRequest.of(페이지번호, 페이지당 게시글 개수, 정렬방식, 컬럼명)

        Page<IwcTbl> result = null;
        result = iwcRepo.findByIwcCodeGreaterThan(0L, pb);
//        if(pNum.getKeyword() == ""){
//            result = bRepo.findByBnumGreaterThan(0L, pb);
//        }
//        else {
//            result = bRepo.findBySearch(0L, pNum.getColumn(), pNum.getKeyword(), pb);
//        }

        //page 객체를 list로 변환 후 전송.
        List<IwcTbl> bList = result.getContent();//page에서 게시글목록을 꺼내와서
        //bList에 저장.
        int totalPage = result.getTotalPages();//전체 페이지 개수

        Map<String, Object> res = new HashMap<>();
        res.put("bList", bList);
        res.put("totalPage", totalPage);
        res.put("pageNum", pNum);


        return res;
    }

    public void reportProc(String reason, String description, String where, String id, Long code) {
        ReportTbl report = new ReportTbl();
        report.setRReason(reason);
        report.setRContent(description);
        report.setRFrom(where);
        report.setRUid(id);
        report.setFromCode(code);

        repRepo.save(report);
    }
}
