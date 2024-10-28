package com.icia.ggdserver.service;

import com.icia.ggdserver.dto.DateDto;
import com.icia.ggdserver.entity.BmemberTbl;
import com.icia.ggdserver.entity.NmemberTbl;
import com.icia.ggdserver.repository.BMemberRepository;
import com.icia.ggdserver.repository.NMemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Slf4j
public class AdminService {

    @Autowired
    private NMemberRepository aRepo;

    public Map<String, Object> getMemberList(DateDto dd) {
        log.info("getBoardList()");

        //페이지 당 보여질 게시글 개수
        int listCnt = 10;

        //페이징 조건 처리 객체 생성(Pageable)
        Pageable pb = PageRequest.of((dd.getPageNum() - 1), listCnt);
        //PageRequest.of(페이지번호, 페이지당 게시글 개수, 정렬방식, 컬럼명)

        Page<NmemberTbl> result = null;

        //검색과 조회가 없는 경우
        if(dd.getStartDate().isEmpty() && dd.getSearchKeyword().isEmpty()){
            log.info("case1");
            result = aRepo.findAll(pb);
        }
        //검색하는 경우
        else if(!dd.getSearchKeyword().isEmpty()){
            //아이디 검색
            if(dd.getSearchColumn().equals("ID")){
                log.info("case2");
                result = aRepo.findByNid(dd.getSearchKeyword(), pb);
            }
            //이름 검색과 조회
            else if(dd.getSearchColumn().equals("이름")
                    && !dd.getStartDate().isEmpty()){
                log.info("case3");
                result = aRepo.searchByNnameAndNsigndt(
                        dd.getSearchKeyword(),
                        dd.getStartDate(),
                        dd.getEndDate(), pb);
            }
            else {//이름 검색(조회는 안함.)
                log.info("case4");
                result = aRepo.findByNname(dd.getSearchKeyword(), pb);
            }
        }
        //조회만 하는 경우
        else if(!dd.getStartDate().isEmpty() && dd.getSearchKeyword().isEmpty()) {
            log.info("case5");
            result = aRepo.searchByNsigndt(dd.getStartDate(), dd.getEndDate(), pb);
        }

        //page 객체를 list로 변환 후 전송.
        List<NmemberTbl> mList = result.getContent();//page에서 게시글목록을 꺼내와서
        //bList에 저장.
        int totalPage = result.getTotalPages();//전체 페이지 개수

        Map<String, Object> res = new HashMap<>();
        res.put("mlist", mList);
        res.put("totalPage", totalPage);
        res.put("pageNum", dd.getPageNum());

        return res;
    }

//    @Autowired
//    private BMemberRepository abRepo;
//
//    public Map<String, Object> getBmemberList(DateDto dd) {
//        log.info("getBoardList()");
//
//        //페이지 당 보여질 게시글 개수
//        int listCnt = 10;
//
//        //페이징 조건 처리 객체 생성(Pageable)
//        Pageable pb = PageRequest.of((dd.getPageNum() - 1), listCnt);
//        //PageRequest.of(페이지번호, 페이지당 게시글 개수, 정렬방식, 컬럼명)
//
//        Page<BmemberTbl> result = null;
//        if (dd.getStartDate() == null) {
//            result = abRepo.findAll(pb);
//        } else {
//            //result = aRepo.findBySearch(dd.getStartDate(), dd.getEndDate(), pb);
//        }
//
//        //page 객체를 list로 변환 후 전송.
//        List<BmemberTbl> bList = result.getContent();//page에서 게시글목록을 꺼내와서
//        //bList에 저장.
//        int totalPage = result.getTotalPages();//전체 페이지 개수
//
//        Map<String, Object> res = new HashMap<>();
//        res.put("blist", bList);
//        res.put("totalPage", totalPage);
//        res.put("pageNum", dd.getPageNum());
//
//        return res;
//    }


}
