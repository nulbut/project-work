package com.icia.ggdserver.service;

import com.icia.ggdserver.dto.GameVsDto;
import com.icia.ggdserver.dto.TurnImgDto;
import com.icia.ggdserver.entity.*;
import com.icia.ggdserver.repository.*;
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
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@Slf4j
public class IdealWorldCupService {
    @Autowired
    private IwcTblRepository iwcRepo;

    @Autowired
    private IwcContentsRepository conRepo;

    @Autowired
    private IwcLikeRepository likeRepo;

    @Autowired
    private UsedTblRepository usedRepo;

    @Autowired
    private UsedFileRepository usfRepo;

    @Autowired
    private IwcCommentRepository icoRepo;

    public String insertIwc(IwcTbl iwc,
                              List<MultipartFile> files,
                              HttpSession session){
        log.info("insertIwc()");
        log.info("iwc: {}", iwc);
        String result = null;//react 쪽으로 보내는 처리 결과 메시지.

        try {
            iwcRepo.save(iwc);
            log.info("bnum : {}", iwc.getIwcCode());

            if(files != null && !files.isEmpty()){
                fileUpload(files, session, iwc.getIwcCode());
                List<IwcContentsTbl> firstsecond = conRepo.findimg(iwc.getIwcCode());
                log.info("first second: {}", firstsecond);
                int i = 1;
                for(IwcContentsTbl it : firstsecond){
                    if (i == 1){
                        log.info("it: {}", it);
                        iwcRepo.setFirstImg(it);
                        i++;
                    }else{
                        iwcRepo.setSecondImg(it);
                    }
                }
//                iwcRepo.updateIwcTblByIwcFirstImageAndIwcFirstNameAndIwcSecondImageAndIwcSecondName(conRepo.findTop2ByIwcContentsIwcCode(iwc.getIwcCode()));


            }

            log.info("code: {}", iwc.getIwcCode()+"");
            result = iwc.getIwcCode()+"";
        } catch (Exception e){
            e.printStackTrace();
            result = "fail";
        }

        return result;
    }

    private void fileUpload(List<MultipartFile> files,
                            HttpSession session,
                            long iwccode) throws Exception {
        log.info("fileUpload()");

        String realPath = session.getServletContext().getRealPath("/");

        realPath += "upload/";//파일 저장 위치(webapp/upload/)

        File folder = new File(realPath);

        if(folder.isDirectory() == false){
            folder.mkdir();//upload폴더가 없을 때 생성.
        }




        //파일 목록에서 파일을 하나씩 꺼내서 저장
        for(MultipartFile mf : files){

            String oriname = mf.getOriginalFilename();

            IwcContentsTbl bf = new IwcContentsTbl();
            bf.setIwcContentsOriname(oriname);//원래 파일명
            bf.setIwcContentsName(oriname);//일단 이름
            bf.setIwcContentsIwcCode(iwccode);//게시글 번호

            String sysname = System.currentTimeMillis()
                    + oriname.substring(oriname.lastIndexOf("."));
            bf.setIwcContentsSysname(sysname);

            //파일 저장
            File file = new File(realPath + sysname);
            mf.transferTo(file);

            //파일 정보를 DB에 저장
            conRepo.save(bf);
        }
    }

    public Map<String, Object> getBoardList(Integer pNum, String searchKeyword, String timeRange, String sortBy,String nid){
        log.info("getBoardList(){} {} {} {} {}",pNum,searchKeyword,timeRange,sortBy,nid);

        if(pNum == null){
            pNum = 1;
        }

        //페이지 당 보여질 게시글 개수
        int listCnt = 16;

        //페이징 조건 처리 객체 생성(Pageable)
        Pageable pb = PageRequest.of((pNum - 1), listCnt);
        //PageRequest.of(페이지번호, 페이지당 게시글 개수, 정렬방식, 컬럼명)

        Page<IwcTbl> result = null;
        result = iwcRepo.getListFilterSearch(searchKeyword,timeRange, sortBy,pb);

        //page 객체를 list로 변환 후 전송.
        List<IwcTbl> bList = result.getContent();//page에서 게시글목록을 꺼내와서

        //bList에 저장.
        int totalPage = result.getTotalPages();//전체 페이지 개수

        Map<Long, Boolean> likeStatusMap = new HashMap<>();
        List<Long> iwcCodes = bList.stream().map(IwcTbl::getIwcCode).collect(Collectors.toList());
        List<IwcLikeTbl> likeRecords = likeRepo.findByIwcCodeInAndLikeNid(iwcCodes, nid);

        for (IwcLikeTbl like : likeRecords) {
        likeStatusMap.put(like.getIwcCode(), true);  // 좋아요 눌렀으면 true로 설정
        }

        bList.forEach(board -> {
            board.setLiked(likeStatusMap.getOrDefault(board.getIwcCode(), false));  // 기본값 false
        });

        Map<String, Object> res = new HashMap<>();
        res.put("bList", bList);
        res.put("totalPage", totalPage);
        res.put("pageNum", pNum);


        return res;
    }

    public Map<String, Object> getBoardListLike(Integer pNum, String searchKeyword, String timeRange, String sortBy,String nid){
        log.info("getBoardList(){} {} {} {} {}",pNum,searchKeyword,timeRange,sortBy,nid);

        if(pNum == null){
            pNum = 1;
        }

        //페이지 당 보여질 게시글 개수
        int listCnt = 16;

        //페이징 조건 처리 객체 생성(Pageable)
        Pageable pb = PageRequest.of((pNum - 1), listCnt);
        //PageRequest.of(페이지번호, 페이지당 게시글 개수, 정렬방식, 컬럼명)
        List<Long> userLikes = likeRepo.findIwcCodes(nid);

        log.info("userLikes: {}", userLikes);
        Page<IwcTbl> result = null;
        result = iwcRepo.getListFilterSearchLike(searchKeyword,timeRange, sortBy,userLikes,pb);


        //page 객체를 list로 변환 후 전송.
        List<IwcTbl> bList = result.getContent();//page에서 게시글목록을 꺼내와서

        //bList에 저장.
        int totalPage = result.getTotalPages();//전체 페이지 개수

        Map<Long, Boolean> likeStatusMap = new HashMap<>();
        List<Long> iwcCodes = bList.stream().map(IwcTbl::getIwcCode).collect(Collectors.toList());
        List<IwcLikeTbl> likeRecords = likeRepo.findByIwcCodeInAndLikeNid(iwcCodes, nid);

        for (IwcLikeTbl like : likeRecords) {
            likeStatusMap.put(like.getIwcCode(), true);  // 좋아요 눌렀으면 true로 설정
        }

        bList.forEach(board -> {
            board.setLiked(likeStatusMap.getOrDefault(board.getIwcCode(), false));  // 기본값 false
        });

        Map<String, Object> res = new HashMap<>();
        res.put("bList", bList);
        res.put("totalPage", totalPage);
        res.put("pageNum", pNum);


        return res;
    }

    public Map<String, Object> getMyBoardList(Integer pNum, String searchKeyword, String timeRange, String sortBy,String nid){
        log.info("getBoardList()");

        if(pNum == null){
            pNum = 1;
        }

        //페이지 당 보여질 게시글 개수
        int listCnt = 16;

        //페이징 조건 처리 객체 생성(Pageable)
        Pageable pb = PageRequest.of((pNum - 1), listCnt);
        //PageRequest.of(페이지번호, 페이지당 게시글 개수, 정렬방식, 컬럼명)

        Page<IwcTbl> result = null;
        result = iwcRepo.getListFilterSearchMy(searchKeyword,timeRange, sortBy,nid,pb);
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
        Map<Long, Boolean> likeStatusMap = new HashMap<>();
        List<Long> iwcCodes = bList.stream().map(IwcTbl::getIwcCode).collect(Collectors.toList());
        List<IwcLikeTbl> likeRecords = likeRepo.findByIwcCodeInAndLikeNid(iwcCodes, nid);

        for (IwcLikeTbl like : likeRecords) {
            likeStatusMap.put(like.getIwcCode(), true);  // 좋아요 눌렀으면 true로 설정
        }

        bList.forEach(board -> {
            board.setLiked(likeStatusMap.getOrDefault(board.getIwcCode(), false));  // 기본값 false
        });

        Map<String, Object> res = new HashMap<>();
        res.put("bList", bList);
        res.put("totalPage", totalPage);
        res.put("pageNum", pNum);

        return res;
    }

    public List<IwcContentsTbl> getGameContent(Long code) {
        log.info("getGameContent()");

        List<IwcContentsTbl> result = conRepo.findAllByIwcContentsIwcCode(code);
        iwcRepo.updateViews(code);

        return result;


    }

    public void updateGameContent(ArrayList<IwcContentsTbl> table) {
        log.info("updateGameContent()");
        conRepo.saveAll(table);

        List<IwcContentsTbl> firstsecond = conRepo.findimg(table.get(0).getIwcContentsIwcCode());
        log.info("first second: {}", firstsecond);
        int i = 1;
        for(IwcContentsTbl it : firstsecond){
            if (i == 1){
                log.info("it: {}", it);
                iwcRepo.setFirstImg(it);
                i++;
            }else{
                iwcRepo.setSecondImg(it);
            }
        }

    }

    public void updateDeleteGameContent(ArrayList<IwcContentsTbl> deleteGoods) {
        log.info("updateDeleteGameContent()");
        for(IwcContentsTbl iwc : deleteGoods){
            log.info("iwc: {}", iwc);
        }
        conRepo.deleteAll(deleteGoods);

    }


    public void updateGameVs(GameVsDto request) {
        Long win = request.getWin();
        Long lose = request.getLose();
        Long iwcCode = request.getIwcCode();
        conRepo.updateVs(win);
        if (lose != null){
            conRepo.updateVs(lose);
        }
        conRepo.updateWin(win);

        log.info(iwcCode+"");
        if(iwcCode != null){
            conRepo.updateFinal(win);
            iwcRepo.updateComplete(iwcCode);
        }
    }

    public Map<String, String> deleteCup(long iwccode, HttpSession session) {
        Map<String, String> rsMap = new HashMap<>();

        try{
            //파일 삭제
            List<IwcContentsTbl> fileList = conRepo.findAllByIwcContentsIwcCode(iwccode);
            if(!fileList.isEmpty()){
                deleteFiles(fileList, session);
            }
            //게시글(DB) 삭제
            iwcRepo.deleteById(iwccode);
            //파일 목록(DB) 삭제
            conRepo.deleteByIwcContentsIwcCode(iwccode);

            rsMap.put("res", "ok");
        } catch (Exception e){
            e.printStackTrace();
            rsMap.put("res", "fail");
        }

        return rsMap;
    }
    private void deleteFiles(List<IwcContentsTbl> fileList,
                             HttpSession session)
            throws Exception{
        log.info("deleteFiles()");
        String realPath = session.getServletContext()
                .getRealPath("/");
        realPath += "upload/";

        for(IwcContentsTbl bf : fileList){
            File file = new File(realPath + bf.getIwcContentsSysname());
            if(file.exists()){//파일 존재 확인
                file.delete();
            }
        }
    }

    public void toggleLike(long iwcCode, String likeNid, boolean isLiked) {
        try {
            IwcTbl game = iwcRepo.findById(iwcCode)
                    .orElseThrow(() -> new IllegalArgumentException("Game not found"));

            if (isLiked) {
                // 좋아요를 취소할 경우
                likeRepo.deleteByIwcCodeAndLikeNid(iwcCode, likeNid);

            } else {
                // 좋아요를 추가할 경우
                IwcLikeTbl iwcLike = new IwcLikeTbl();
                iwcLike.setIwcCode(iwcCode);
                iwcLike.setLikeNid(likeNid);
                likeRepo.save(iwcLike);
            }

            long likeCount = likeRepo.countByIwcCode(iwcCode);
            game.setIwcLike(likeCount);
            iwcRepo.save(game);
            // 해당 게임의 좋아요 개수 업데이트


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Map<String, Object> getGameWinner(long iwcCode, long iwcContentsCode) {
        Map<String, Object> res = new HashMap<>();
        res.put("iwc", iwcRepo.findById(iwcCode));
        res.put("content", conRepo.findById(iwcContentsCode));
        res.put("rank",conRepo.getWinnerRank(iwcCode,iwcContentsCode));
        return res;
    }

    public Map<String, Object> getAdList(String category) {
        Map<String, Object> res = new HashMap<>();
        List<UsedProductTbl> uList = usedRepo.findRandomUsedProductsByName(category);
        for (UsedProductTbl uL : uList) {
            List<UsedproductFileTbl> ufList = usfRepo.findByUsedFileNum(uL.getUsedCode());
            uL.setUsedproductFileTblList(ufList);
        }
        res.put("used",uList);
        return res;


    }
    public IwcCommentTbl addComment(IwcCommentTbl comment) {
        return icoRepo.save(comment);  // 댓글 추가
    }

    public List<IwcCommentTbl> getCommentsByPost(Long postId) {
        return icoRepo.findByIwcCode(postId);  // 게시글에 달린 댓글 조회
    }
}
