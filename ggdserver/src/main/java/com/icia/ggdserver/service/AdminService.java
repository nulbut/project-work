package com.icia.ggdserver.service;

import com.icia.ggdserver.dto.DateDto;
import com.icia.ggdserver.entity.NmemberTbl;
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
        if(dd.getStartDate() == ""){
            result = aRepo.findAll(pb);
        }
        else {
            //result = aRepo.findBySearch(dd.getStartDate(), dd.getEndDate(), pb);
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


//    public long countByNid(String n_id) {
//        return aRepo.countByNid(n_id);
//    }
//
//    public Optional<NmemberTbl> findById(Long id) {
//    }
//
//    public long countByNname(String n_name) {
//        return aRepo.countByNname(n_name);
//    }
//
//    public long countByNphonenum(String n_phonenum) {
//        return aRepo.countByNphonenum(n_phonenum);
//    }
//
//    public long countByNemail(String n_email) {
//        return aRepo.countByNemail(n_email);
//    }
//
//    public long countByNsigndt(Timestamp n_signdt) {
//        return aRepo.countByNSigndt(n_signdt);
//    }
//
//    public long countByNstatus(String n_status) {
//        return aRepo.countByNStatus(n_status);
//    }


}
