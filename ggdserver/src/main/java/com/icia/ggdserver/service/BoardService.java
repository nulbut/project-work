package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.BoardTbl;
import com.icia.ggdserver.repository.BoardRepository;
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


@Service
@Slf4j
public class BoardService {
    @Autowired
    private BoardRepository bRepo;

//    public Map<String, Object> getBoardList(Integer pageNum) {
//        log.info("getBoardList()");
//
//        if (pageNum == null) {
//            pageNum = 1;
//        }
//
//        //페이지 당 보여질 문의게시글 개수
//        int listCnt = 10;
//
//        //페이징 조건 처리 객체 생성(Pageable)
//        Pageable pb = PageRequest.of((pageNum - 1), listCnt,
//                Sort.Direction.DESC,"BoardCode");
//        //PageRequest.of(페이지번호, 페이지당 문의게시글 개수, 정렬방식, 컬럼명)
//
//        Page<BoardTbl> result = bRepo.findBoardCodeGreaterThan(0L, pb);
//        //page 객체를 list 로 변환 후 전송.
//        List<BoardTbl> boardList = result.getContent();//page에서 문의게시글을 꺼내서
//                                                       //boardList에 저장
//        int totalPages = result.getTotalPages();// 전체 페이지 개수
//
//        Map<String, Object> res = new HashMap<>();
//        res.put("boardList", boardList);
//        res.put("totalPages", totalPages);
//        res.put("pageNum", pageNum);
//
//        return res;
//    }
}
