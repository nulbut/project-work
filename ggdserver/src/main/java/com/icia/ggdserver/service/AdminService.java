package com.icia.ggdserver.service;

import com.icia.ggdserver.dto.DateDto;
import com.icia.ggdserver.entity.BmemberTbl;
import com.icia.ggdserver.entity.NmemberTbl;
import com.icia.ggdserver.entity.NoticeFiletbl;
import com.icia.ggdserver.entity.NoticeTbl;
import com.icia.ggdserver.repository.BMemberRepository;
import com.icia.ggdserver.repository.NMemberRepository;
import com.icia.ggdserver.repository.NoticeFileRepository;
import com.icia.ggdserver.repository.NoticeRepository;
import jakarta.persistence.Transient;
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
import java.util.Optional;

@Service
@Slf4j
public class AdminService {

    @Autowired
    private NMemberRepository aRepo;

    @Autowired
    private NoticeRepository nRepo;

    @Autowired
    private NoticeFileRepository nfRepo;

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

    public Map<String, Object> getNoticeList(Integer pageNum) {
        log.info("getNoticeList()");

        if (pageNum == null) {
            pageNum = 1;
        }

        int listCnt = 10;

        Pageable pb = PageRequest.of((pageNum -1), listCnt, Sort.Direction.DESC, "nNum");

        Page<NoticeTbl> result = nRepo.findBynNumGreaterThan(0L, pb);

        List<NoticeTbl> nList = result.getContent();

        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("nList", nList);
        res.put("totalPage", totalPage);
        res.put("pageNum",pageNum);

        return res;
    }

    public String insertNotice(NoticeTbl notice, List<MultipartFile> files, HttpSession session){
        log.info("insertNotice()");
        String result = null;

        try {
            nRepo.save(notice);
            log.info("nnum : {}", notice.getNNum());

            if (files != null && !files.isEmpty()){
                fileUpload(files,
                        session,
                        notice.getNNum());
            }
            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            result = "fail";
        }
        return result;
    }

    private void fileUpload(List<MultipartFile> files,
                            HttpSession session,
                            long nfnum) throws Exception {
        log.info("fileUpload()");

        String realPath = session.getServletContext().getRealPath("/");

        realPath += "upload/"; // 파일 저장 위치 ->(webapp/upload/ 형식으로 폴더가 만들어지고, 그 폴더에 파일이 저장됨)

        File folder = new File(realPath);

        if (folder.isDirectory() == false){
            folder.mkdir(); // upload 폴더가 없을 때 생성
        }

        // 파일 목록에서 파일을 하나씩 꺼내서 저장
        for (MultipartFile mf : files){
            String oriname = mf.getOriginalFilename();

            NoticeFiletbl nf = new NoticeFiletbl();
            nf.setNfOriname(oriname); // 원래 파일면
            nf.setNfAid(nfnum); // 게시글 번호

            String sysname = System.currentTimeMillis()
                    + oriname.substring(oriname.lastIndexOf("."));
            nf.setNfSysname(sysname);

            // 파일 저장
            File file = new File(realPath + sysname);
            mf.transferTo(file);

            // 파일 정보를 DB에 저장
            nfRepo.save(nf);

        }

    }

    public NoticeTbl getNotice(long nnum) {
        log.info("getNotice()");

        // 게시글 가져와서 담기
        NoticeTbl notice = nRepo.findById(nnum).get();
        // 첨부파일 목록 가져와서 담기
        List<NoticeFiletbl> nfList = nfRepo.findAllByNfAid(nnum);

        notice.setNfList(nfList); // 게시글에 첨부파일 목록 추가

        return notice;
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
