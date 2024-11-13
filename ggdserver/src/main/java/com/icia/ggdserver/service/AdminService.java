package com.icia.ggdserver.service;

import com.icia.ggdserver.dto.DateDto;
import com.icia.ggdserver.entity.*;
import com.icia.ggdserver.repository.*;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.*;

@Service
@Slf4j
public class AdminService {

    @Autowired
    private NMemberRepository aRepo;

    @Autowired
    private BMemberRepository bRepo;

    @Autowired
    private NoticeRepository nRepo;

    @Autowired
    private NoticeFileRepository nfRepo;

    @Autowired
    private ReportRepository rRepo;

    @Autowired
    private ReportFileRepository rfRepo;

    @Autowired
    private DirectMessageRepository dmRepo;

    @Autowired
    private DmFileRepository dfRepo;

    @Autowired
    private UproductReviewTblRepository rvRepo;



    @Autowired
    MemberRepository mRepo;
    //로그인 처리 메소드
    public Map<String, String> loginProc(Member member){
        log.info("loginProc()");
        Member dbMember = null;
        Map<String, String> rsMap = new HashMap<>();

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

        try {
            dbMember = mRepo.findById(member.getMid()).get();
            //db에서 꺼내온 사용자의 비번과 입력한 비번을 비교.
//            if(encoder.matches(member.getMpwd(), dbMember.getMpwd())){
            if(Objects.equals(member.getMpwd(), dbMember.getMpwd())){
                //로그인 성공
                rsMap.put("res", "ok");
                rsMap.put("id", member.getMid());
            }
            else {
                //비번이 맞지 않은 경우
                rsMap.put("res", "fail");
                rsMap.put("msg", "비밀번호가 틀립니다.");
            }
        } catch (Exception e){
            e.printStackTrace();
            //회원이 아닌 경우
            rsMap.put("res", "fail");
            rsMap.put("msg", "아이디가 존재하지 않습니다.");
        }
        return rsMap;
    }
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

    public Map<String, Object> getBmemberList(DateDto dd) {
        log.info("getBboardList()");

        //페이지 당 보여질 게시글 개수
        int listCnt = 10;

        //페이징 조건 처리 객체 생성(Pageable)
        Pageable pb = PageRequest.of((dd.getPageNum() - 1), listCnt);
        //PageRequest.of(페이지번호, 페이지당 게시글 개수, 정렬방식, 컬럼명)

        Page<BmemberTbl> result = null;

        //검색과 조회가 없는 경우
        if(dd.getStartDate().isEmpty() && dd.getSearchKeyword().isEmpty()){
            log.info("case1");
            result = bRepo.findAll(pb);
        }
        //검색하는 경우
        else if(!dd.getSearchKeyword().isEmpty()){
            //아이디 검색
            if(dd.getSearchColumn().equals("ID")){
                log.info("case2");
                result = bRepo.findByBid(dd.getSearchKeyword(), pb);
            }
            //이름 검색과 조회
            else if(dd.getSearchColumn().equals("이름")
                    && !dd.getStartDate().isEmpty()){
                log.info("case3");
                result = bRepo.searchByBnameAndBsigndt(
                        dd.getSearchKeyword(),
                        dd.getStartDate(),
                        dd.getEndDate(), pb);
            }
            else {//이름 검색(조회는 안함.)
                log.info("case4");
                result = bRepo.findByBname(dd.getSearchKeyword(), pb);
            }
        }
        //조회만 하는 경우
        else if(!dd.getStartDate().isEmpty() && dd.getSearchKeyword().isEmpty()) {
            log.info("case5");
            result = bRepo.searchByBsigndt(dd.getStartDate(), dd.getEndDate(), pb);
        }

        //page 객체를 list로 변환 후 전송.
        List<BmemberTbl> bList = result.getContent();//page에서 게시글목록을 꺼내와서
        //bList에 저장.
        int totalPage = result.getTotalPages();//전체 페이지 개수

        Map<String, Object> res = new HashMap<>();
        res.put("blist", bList);
        res.put("totalPage", totalPage);
        res.put("pageNum", dd.getPageNum());

        return res;
    }


    public Map<String, Object> getNoticeList(Integer pageNum) {
        log.info("getNoticeList() {}",pageNum);

        if (pageNum == null) {
            pageNum = 1;
        }

        int listCnt = 10;

        Pageable pb = PageRequest.of((pageNum -1), listCnt, Sort.Direction.DESC, "n_num");

        Page<NoticeTbl> result = nRepo.getNoticeTbl(pb);
        log.info(result.getContent().toString());
        List<NoticeTbl> nList = result.getContent();

        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("nList", nList);
        res.put("totalPage", totalPage);
        res.put("pageNum",pageNum);

        return res;
    }
    @Autowired
    private UserGradeRepository ugRepo;

    public void writeGradeProc(ArrayList<UserGradeTbl> gl){
        ugRepo.saveAll(gl);
        ugRepo.deleteByUgIdIsGreaterThan(gl.size());
        log.info("writeGradeProc");
    }

    public ArrayList<UserGradeTbl> getGradeList() {
        log.info("getBoardList()");
        ArrayList<UserGradeTbl> result = null;
        result = (ArrayList<UserGradeTbl>) ugRepo.findAll();

        //page 객체를 list로 변환 후 전송.
//        List<BmemberTbl> bList = result.getContent();//page에서 게시글목록을 꺼내와서
//        //bList에 저장.
//        int totalPage = result.getTotalPages();//전체 페이지 개수
//
//        Map<String, Object> res = new HashMap<>();
//        res.put("blist", bList);
//        res.put("totalPage", totalPage);
//        res.put("pageNum", dd.getPageNum());

        return result;
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
        log.info("realPath : {}", realPath);

        realPath += "nupload/"; // 파일 저장 위치 ->(webapp/upload/ 형식으로 폴더가 만들어지고, 그 폴더에 파일이 저장됨)

        File folder = new File(realPath);

        if (folder.isDirectory() == false){
            folder.mkdir(); // upload 폴더가 없을 때 생성
        }

        // 파일 목록에서 파일을 하나씩 꺼내서 저장
        for (MultipartFile mf : files){
            String oriname = mf.getOriginalFilename();

            NoticeFileTbl nf = new NoticeFileTbl();
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
        List<NoticeFileTbl> nfList = nfRepo.findAllByNfAid(nnum);

        notice.setNfList(nfList); // 게시글에 첨부파일 목록 추가

        return notice;
    }

    @Transactional
    public Map<String, String> deleteNotice(long nnum,
                                            HttpSession session){
        log.info("deleteNotice()");
        Map<String, String> rsMap = new HashMap<>();

        try {
            List<NoticeFileTbl> fileList = nfRepo.findAllByNfAid(nnum);
            if (!fileList.isEmpty()){
                deleteNotices(fileList, session);
            }
            nRepo.deleteById(nnum);
            nfRepo.deleteAllBynfAid(nnum);

            rsMap.put("res", "ok");
        } catch (Exception e){
            e.printStackTrace();
            rsMap.put("res", "ok");
        }

        return rsMap;

    }

    private void deleteNotices(List<NoticeFileTbl> fileList, HttpSession session)throws Exception {
        log.info("deleteNotices()");
        String realpath = session.getServletContext().getRealPath("/");
        realpath += "nupload/";

        for (NoticeFileTbl nf : fileList) {
            File file = new File((realpath + nf.getNfSysname()));
            if (file.exists()) {
                file.delete();
            }
        }
    }

    public Map<String, Object> getReportList(Integer pageNum) {
        return null;
    }

    public ReportTbl getReport(long rNum) {
        log.info("getReport()");

        // 게시글 가져와서 담기
        ReportTbl report = rRepo.findById(rNum).get();
        // 첨부파일 목록 가져와서 담기
        List<ReportFileTbl> rfList = rfRepo.findByRfUid(rNum);

        report.setRfList(rfList); // 게시글에 첨부파일 목록 추가


        return report;

    }

    @Transactional
    public String rpUpdate(long rNum) {
        log.info("rpUpdate()");
        String result = null;

        try {
            rRepo.updateByRNum(rNum);

            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            result = "fail";
        }
        return result;
    }


    public Map<String, Object> getDList(Integer pageNum) {
        log.info("getDList()");

        if (pageNum == null){
            pageNum = 1;
        }

        int listCnt = 10;

        Pageable pb = PageRequest.of((pageNum -1), listCnt, Sort.Direction.DESC, "DNum");

        Page<DmsgTbl> result = dmRepo.findByDNumGreaterThan(0L, pb);

        List<DmsgTbl> dList = result.getContent();

        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("dList", dList);
        res.put("totalPage", totalPage);
        res.put("pageNum", pageNum);

        return res;
    }

    public DmsgTbl getDmList(long dnum) {
        log.info("getDmList()");

        // 게시글 가져와서 담기
        DmsgTbl dm = dmRepo.findById(dnum).get();
        // 첨부파일 목록 가져와서 담기
        List<DmFileTbl> dfList = dfRepo.findByDfUid(dnum);

        dm.setDfList(dfList); // 게시글에 첨부파일 목록 추가

        return dm;
    }

    public String getComment(DmsgTbl directmsg) {
        log.info("getComment()");
        String result = null;

        try {
            directmsg.setDStatus("답변완료");// 예시: 상태를 "답변 완료"로 변경
            dmRepo.save(directmsg);// 댓글 업데이트


            result = "ok";  // 성공
        } catch (Exception e) {
            e.printStackTrace();
            result = "fail";  // 실패
        }
        return result;
    }

    public List<UproductReviewTbl> getrvList() {
        log.info("getrvList()");

        // 게시글 가져와서 담기
        List<UproductReviewTbl> rv = (List<UproductReviewTbl>) rvRepo.findAll();


        return rv;

    }

    @Transactional
    public Map<String, String> deletereview(long uNum) {
        log.info("deletereview()");
        Map<String, String> rsMap = new HashMap<>();

        try {
            rvRepo.deleteById(uNum);
            rsMap.put("res", "ok");
        } catch (Exception e){
            e.printStackTrace();
            rsMap.put("res", "fail");
        }
        return rsMap;
    }
}




















