package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.*;
import com.icia.ggdserver.repository.*;
import  jakarta.servlet.http.HttpSession;
import  lombok.extern.slf4j.Slf4j;
import  org.springframework.beans.factory.annotation.Autowired;
import  org.springframework.data.domain.Page;
import  org.springframework.data.domain.PageRequest;
import  org.springframework.data.domain.Pageable;
import  org.springframework.data.domain.Sort;
import  org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import  org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@Slf4j
public class ShoppingMallService {

    @Autowired
    private ProductTblRepository pdtRepo;

    @Autowired
    private ProductRegistrationRepository pdrRepo;

    @Autowired
    private BproductRepository bpdRepo;

    @Autowired
    private UproductReviewTblRepository urRepo;


    public String insertSpm(ProductTbl pdt,
                            List<MultipartFile> files,
                            HttpSession session) {
        log.info("insertSpm()");
        String result = null;

        try {
            //pdtRepo
            pdtRepo.save(pdt);
            log.info("bnum : {}", pdt.getProductCode());

            if (files != null && !files.isEmpty()) {
                uploadFile(files, session, pdt.getProductCode());
            }
            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            result = "fail";
        }

    return result;
}
private void uploadFile(List<MultipartFile> files,
                        HttpSession session,
                        long productFileNum) throws Exception{
    log.info("UploadFile");

        String realPath = session.getServletContext().getRealPath("/");

        realPath += "upload/";

        File folder = new File(realPath);

        if (folder.isDirectory() == false) {
            folder.mkdir();
        }

        for (MultipartFile mf : files) {
            String oriname = mf.getOriginalFilename();

        ProductFileTbl bf = new ProductFileTbl();
        bf.setProductFileOriname(oriname);
        bf.setProductFileNum(productFileNum);

            String sysname = System.currentTimeMillis()
                    + oriname.substring(oriname.lastIndexOf("."));
            bf.setProductFileSysname(sysname);

            File file = new File(realPath + sysname);
            mf.transferTo(file);

            pdrRepo.save(bf);
        }
    }

    public Map<String, Object> getProductList(Integer pageNum, String sellerId) {
        log.info("getProductList() sellerId : {}", sellerId);

        if (pageNum == null) {
            pageNum = 1;
        }
        int listCnt = 8;

        Pageable pb = PageRequest.of((pageNum - 1), listCnt,
                Sort.Direction.DESC, "productCode");

        Page<ProductTbl> result = pdtRepo.  findByProductCodeGreaterThanAndSellerId(0L, sellerId, pb);

        List<ProductTbl> bList = result.getContent();

        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("bList", bList);
        res.put("totalPage", totalPage);
        res.put("pageNum", pageNum);
        res.put("sellerId", sellerId);

        return res;
    }

public ProductTbl getProduct(long productFileNum){
    log.info("getBoard()");
    //상품 가져오기
    ProductTbl productTbl = pdtRepo.findById(productFileNum).get();
    //첨부파일 목록 가져와서 담기
    List<ProductFileTbl> pfList = pdrRepo.findByproductFileNum(productFileNum);

    productTbl.setProductFileList(pfList);

    return productTbl;
}

    @Transactional
    public Map<String, String> boardDelete(long productCode,
                                           HttpSession session) {
        log.info("boardDelete()");
        Map<String, String> rsMap = new HashMap<>();
        try {
            //파일 삭제
            List<ProductFileTbl> fileList = pdrRepo.findByproductFileNum(productCode);
            if (!fileList.isEmpty()) {
                filesDelete(fileList, session);
            }
            //게시글(DB)삭제
            pdtRepo.deleteById(productCode);
            //파일 목록(DB) 삭제
            pdrRepo.deleteByproductFileNum(productCode);
            rsMap.put("res", "ok");
        } catch (Exception e) {
            e.printStackTrace();
            rsMap.put("res", "fail");
        }
        return rsMap;
    }

    private void filesDelete(List<ProductFileTbl> fileList,
                             HttpSession session)
            throws Exception {
        log.info("filesDelete()");
        String realPath = session.getServletContext().getRealPath("/");
        realPath += "upload/";

        for (ProductFileTbl pf : fileList) {
            File file = new File(realPath + pf.getProductFileOriname());
            if (file.exists()) {
                file.delete();
            }
        }
    }


    public Map<String, Object> getbpdList(Integer pNum) {
        log.info("getBoardList()");

        if (pNum == null) {
            pNum = 1;
        }
        int listCnt = 10;

        Pageable pb = PageRequest.of((pNum - 1), listCnt,
                Sort.Direction.DESC, "bpnum");

        Page<BproductTbl> result = null;
        result = bpdRepo.findByBpnumGreaterThan(0L, pb);

        List<BproductTbl> bList = result.getContent();

        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("bList", bList);
        res.put("totalPage", totalPage);
        res.put("pageNum", pNum);

        return res;
    }

    public Map<String, Object> getproductList(Integer pageNum) {
        log.info("getBoardList()");

        if (pageNum == null) {
            pageNum = 1;
        }

        //페이지 당 보여질 게시글 개수
        int listCnt = 15;

        //페이징 조건 처리 객체 생성(Pageable)
        Pageable pb = PageRequest.of((pageNum - 1), listCnt,
                Sort.Direction.DESC, "ProductCode");


        Page<ProductTbl> result = null;
        result = pdtRepo.findByProductCodeGreaterThan(0L, pb);


        //page 객체를 list로 변환 후 전송.
        List<ProductTbl> bList = result.getContent();//page에서 게시글목록을 꺼내와서
        //bList에 저장.
        for(ProductTbl pt : bList) {
            log.info("돌아가는중");
            pt.setProductFileList(pdrRepo.findByproductFileNum(pt.getProductCode()));
        }
        int totalPage = result.getTotalPages();//전체 페이지 개수



        Map<String, Object> res = new HashMap<>();
        res.put("bList", bList);
        res.put("totalPage", totalPage);
        res.put("pageNum", pageNum);


        return res;
    }
    //후기 작성 메소드
    public String insertupreview(UproductReviewTbl upreview) {
        log.info("insertupreview()");
        String result = null;

        try{
            urRepo.save(upreview);

            result = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            result = "fail";
        }
        return result;
    }

    // 모든 상품 목록을 가져오는 메소드
    public List<ProductTbl> getAllProducts() {
        // pdtRepo.findAll()은 Iterable<ProductTbl>을 반환하므로, 이를 List로 변환
        return StreamSupport.stream(pdtRepo.findAll().spliterator(), false)
                .collect(Collectors.toList());  // Stream을 List로 변환
    }

    //후기 목록 가져오기
    public List<UproductReviewTbl> getReview(long productCode) {
        return urRepo.findByUCode(productCode);
    }
}

