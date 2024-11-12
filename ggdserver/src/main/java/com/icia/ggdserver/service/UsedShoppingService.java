package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.ProductTbl;
import com.icia.ggdserver.entity.UproductReviewTbl;
import com.icia.ggdserver.entity.UsedProductTbl;
import com.icia.ggdserver.entity.UsedproductFileTbl;
import com.icia.ggdserver.repository.UproductReviewTblRepository;
import com.icia.ggdserver.repository.UsedFileRepository;
import com.icia.ggdserver.repository.UsedTblRepository;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


@Service
@Slf4j
public class UsedShoppingService {
    @Autowired
    private UsedTblRepository ustRepo; // 중고 목록 레포지터리

    @Autowired
    private UsedFileRepository usfRepo; // 중고 상품 이미지 레포지터리

    @Autowired
    private UproductReviewTblRepository urRepo;





    public String insertUsed(UsedProductTbl upt,
                             List<MultipartFile> files,
                             HttpSession session) {
        log.info("insertUsed()");
        String result = null; // React로 보내는 처리 결과 메시지

        try {
            ustRepo.save(upt);
            log.info("bnum : {}", upt.getUsedCode());

            if (files != null && !files.isEmpty()) {
                usedfileUpload(files, session, upt.getUsedCode());
            }
            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            result = "fail";
        }
        return result;
    }

    private void usedfileUpload(List<MultipartFile> files,
                                HttpSession session,
                                long usedFileNum) throws Exception {
        log.info("usedfileUpload()");

        String realPath = session.getServletContext().getRealPath("/");

        realPath += "usupload/";// 파일 저장 위치

        File folder = new File(realPath);

        if (folder.isDirectory() == false) {
            folder.mkdir();
        }

        for (MultipartFile mf : files) {
            String oriname = mf.getOriginalFilename();

            UsedproductFileTbl upf = new UsedproductFileTbl();
            upf.setUsedFileOriname(oriname);//파일명
            upf.setUsedFileNum(usedFileNum);// 중고상품 글 번호

            String sysname = System.currentTimeMillis()
                    + oriname.substring(oriname.lastIndexOf("."));
            upf.setUsedFileSysname(sysname);

            //파일 저장
            File file = new File(realPath + sysname);
            mf.transferTo(file);

            //파일 정보를 db에 저장
            usfRepo.save(upf);
        }
    }


    @Transactional
    public Map<String, String> usedDelete(long usedCode,
                                          HttpSession session) {
        log.info("usedDelete()");
        Map<String, String> rsMap = new HashMap<>();
        try {
            //파일 삭제
            List<UsedproductFileTbl> ufileList = usfRepo.findByUsedFileNum(usedCode);
            if (!ufileList.isEmpty()) {
                usedfilesDelete(ufileList, session);
            }
            //게시글 db 삭제
            ustRepo.deleteById(usedCode);
            //파일 목록 db 삭제
            usfRepo.deleteByUsedFileNum(usedCode);
            rsMap.put("res", "ok");
        } catch (Exception e) {
            e.printStackTrace();
            rsMap.put("res", "fail");
        }
        return rsMap;
    }

    private void usedfilesDelete(List<UsedproductFileTbl> ufileList,
                                 HttpSession session)
            throws Exception {
        log.info("usedfilesDelete()");
        String realPath = session.getServletContext().getRealPath("/");
        realPath += "usupload/";

        for (UsedproductFileTbl upf : ufileList) {
            File file = new File(realPath + upf.getUsedFileOriname());
            if (file.exists()) {
                file.delete();
            }
        }
    }

//    @Transactional
//    public Map<String, String> usedboardDelete(Long usedCode,
//                                              HttpSession session) {
//        log.info("usedboardDelete()");
//        Map<String, String> rsMap = new HashMap<>();
//        try {
//            //파일 삭제
//            List<UsedproductFileTbl> usedfileList = usfRepo.findByUsedFileNum(usedCode);
//            if (!usedfileList.isEmpty()) {
//                usedfilesDelete(usedfileList, session);
//            }
//            //게시글 db 삭제
//            ustRepo.deleteById(usedCode);
//            //파일 목록 db 삭제
//            usfRepo.deleteByUsedFileNum(usedCode);
//            rsMap.put("res", "ok");
//        } catch (Exception e) {
//            e.printStackTrace();
//            rsMap.put("res", "fail");
//        }
//        return rsMap;
//    }


    public UsedProductTbl getUsedProduct(long usedFileNum) {
        log.info("getusedBoard()");

        // 중고상품 가져오기
        UsedProductTbl usedproductTbl = ustRepo.findById(usedFileNum).get();
        // 첨부파일 목록 가져와서 담기
        List<UsedproductFileTbl> ufList = usfRepo.findByUsedFileNum(usedFileNum);

        usedproductTbl.setUsedproductFileTblList(ufList);

        return usedproductTbl;

    }

    public Map<String, Object> getUsedList(Integer pageNum, String usedsellerId) {
        log.info("getUesdList() usedsellerId : {}", usedsellerId);

        if (pageNum == null) {
            pageNum = 1;
        }
        int listCnt = 10;

        Pageable pb = PageRequest.of((pageNum - 1), listCnt,
                Sort.Direction.DESC, "usedCode");

        Page<UsedProductTbl> result = ustRepo.findByUsedCodeGreaterThanAndUsedsellerId(0L, usedsellerId, pb);

        List<UsedProductTbl> uList = result.getContent();


        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("uList", uList);
        res.put("totalPage", totalPage);
        res.put("pageNum", pageNum);
        res.put("usedsellerId", usedsellerId);

        return res;
    }

    public Map<String, Object> getusedList(Integer pageNum) {
        log.info("getusedBoardList()");

        if (pageNum == null) {
            pageNum = 1;
        }

        //페이지 당 보여질 중고상품 수
        int listCnt = 15;

        //페이징 조건 처리 객체 생성
        Pageable pb = PageRequest.of((pageNum - 1), listCnt,
                Sort.Direction.DESC, "usedCode");

        Page<UsedProductTbl> result = null;
        result = ustRepo.findByusedCodeGreaterThan(0L, pb);

        //page 객체를 list로 변환 후 전송
        List<UsedProductTbl> uList = result.getContent();//page에서 게시글 목록 꺼내오기
        //uList에 저장
        for(UsedProductTbl upt : uList) {
            log.info("돌아가는ㄴ중");
            upt.setUsedproductFileTblList(usfRepo.findByUsedFileNum(upt.getUsedCode()));
        }
        int totalPage = result.getTotalPages();// 전체 페이지

            Map<String, Object> res = new HashMap<>();
            res.put("uList", uList);
            res.put("totalPage", totalPage);
            res.put("pageNum", pageNum);

            return res;
        }

    public String insertupreview(UproductReviewTbl upreview) {
        log.info("insertupreview()");
        String result = null;

        try{
            upreview.setUPreivew("작성완료");
            urRepo.save(upreview);

            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            result = "fail";
        }
        return result;
    }
}
        }

    // 모든 상품 목록을 가져오는 메소드
    public List<UsedProductTbl> getAllUsedProducts() {
        // pdtRepo.findAll()은 Iterable<ProductTbl>을 반환하므로, 이를 List로 변환
        return StreamSupport.stream(ustRepo.findAll().spliterator(), false)
                .collect(Collectors.toList());  // Stream을 List로 변환
    }
}