package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.BoardFileTbl;
import com.icia.ggdserver.entity.BoardTbl;
import com.icia.ggdserver.repository.BoardFileRepository;
import com.icia.ggdserver.repository.BoardRepository;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@Service
@Slf4j
public class BoardService {
    @Autowired
    private BoardRepository bRepo;

    @Autowired
    private BoardFileRepository bfRepo;

    public Map<String, Object> getBoardList(Integer pageNum) {
        log.info("getBoardList()");

        if (pageNum == null) {
            pageNum = 1;
        }

        //페이지 당 보여질 문의게시글 개수
        int listCnt = 10;

        //페이징 조건 처리 객체 생성(Pageable)
        Pageable pb = PageRequest.of((pageNum - 1), listCnt,
                Sort.Direction.DESC,"BoardCode");
        //PageRequest.of(페이지번호, 페이지당 문의게시글 개수, 정렬방식, 컬럼명)

        Page<BoardTbl> result = bRepo.findByBoardCodeGreaterThan(0L, pb);
        //page 객체를 list 로 변환 후 전송.
        List<BoardTbl> Blist = result.getContent();//page에서 문의게시글을 꺼내서
                                                       //boardList에 저장
        int totalPage = result.getTotalPages();// 전체 페이지 개수

        Map<String, Object> res = new HashMap<>();
        res.put("Blist", Blist);
        res.put("totalPages", totalPage);
        res.put("pageNum", pageNum);

        return res;
    }

    //문의 게시글 저장하는 메소드
    public String insertinqiry(BoardTbl board,
                               List<MultipartFile> files,
                               HttpSession session) {
        log.info("insertiuqiry()");
        String result = null;//React 쪽으로 보내는 처리 결과 메시지

        try {
            bRepo.save(board);
            log.info("boardCode: {}", board.getBoardCode());

            if(files != null && !files.isEmpty()) {
                fileUpload(files, session, board.getBoardCode());
            }
            result = "ok";
        }catch (Exception e) {
            e.printStackTrace();
            result = "fail";
        }
        return result;
    }

    private void fileUpload(List<MultipartFile> files,
                            HttpSession session,
                            long boardCode) throws Exception{
        log.info("fileUpload()");

        String realPath = session.getServletContext().getRealPath("/");

        realPath += "update/"; //파일 저장 위치

        File folder = new File(realPath);

        if(folder.isDirectory() == false){
            folder.mkdir();//update폴더가 없을 때 생성.
        }

        //파일 목록에서 파일을 하나씩 꺼내서 저장
        for(MultipartFile mf : files) {
            String oriname = mf.getOriginalFilename();

            BoardFileTbl bf = new BoardFileTbl();
            bf.setBoardFileOriname(oriname);//원래 파일명
            bf.setBoardFileNum(boardCode);//문의게시글 번호

            String sysname = System.currentTimeMillis()
                    + oriname.substring(oriname.lastIndexOf("."));
            bf.setBoardFileSysname(sysname);

            //파일 저장
            File file = new File(realPath + sysname);
            mf.transferTo(file);

            //파일 정보를 db에 저장
            bfRepo.save(bf);
        }
    }
}
