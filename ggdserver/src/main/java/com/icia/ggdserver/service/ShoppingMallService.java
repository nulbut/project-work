package com.icia.ggdserver.service;

import  com.icia.ggdserver.entity.ProductFileTbl;
import  com.icia.ggdserver.repository.ProductTblRepository;
import  com.icia.ggdserver.entity.ProductTbl;
import  com.icia.ggdserver.repository.ProductRegistrationRepository;
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
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class ShoppingMallService {

@Autowired
private ProductTblRepository pdtRepo;

@Autowired
private ProductRegistrationRepository pdrRepo;

public String insertSpm(ProductTbl pdt,
                        List<MultipartFile> files,
                        HttpSession session){
    log.info("insertSpm()");
    String result = null;

    try{
        //pdtRepo
        pdtRepo.save(pdt);
        log.info("bnum : {}", pdt.getProductCode());

        if(files != null && !files.isEmpty()){
            uploadFile(files, session, pdt.getProductCode());
        }
        result = "ok";
    } catch (Exception e){
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

    if (folder.isDirectory() == false){
        folder.mkdir();
    }

    for (MultipartFile mf : files){
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

public Map<String, Object> getBoardList(Integer pNum){
    log.info("getBoardList()");

    if (pNum == null){
        pNum = 1;
    }
    int listCnt = 10;

    Pageable pb = PageRequest.of((pNum - 1), listCnt,
            Sort.Direction.DESC, "productCode");

    Page<ProductTbl> result = null;
    result = pdtRepo.findByProductCodeGreaterThan(0L,pb);

    List<ProductTbl> bList = result.getContent();

    int totalPage = result.getTotalPages();

    Map<String, Object> res = new HashMap<>();
    res.put("bList", bList);
    res.put("totalPage", totalPage);
    res.put("pageNum", pNum);

    return res;
}

public ProductTbl getBoard(long productFileNum){
    log.info("getBoard()");
    //상품 가져오기
    ProductTbl productTbl = pdtRepo.findById(productFileNum).get();
    //첨부파일 목록 가져와서 담기
    List<ProductFileTbl> pfList = pdrRepo.findByproductFileNum(productFileNum);

    productTbl.setProductFileList(pfList);

    return productTbl;
}

@Transactional
public Map<String, String> boardDelete(long productFileNum,
                                       HttpSession session) {
    log.info("boardDelete()");
    Map<String, String> rsMap = new HashMap<>();
    try {
        //파일 삭제
        List<ProductFileTbl> fileTblList = pdrRepo.findByproductFileNum(productFileNum);
        if(!fileTblList.isEmpty()){
            filesDelete(fileTblList, session);
        }
        //게시글(DB)삭제
        pdtRepo.deleteById(productFileNum);
        //파일 목록(DB) 삭제
        pdrRepo.deleteByproductFileNum(productFileNum);

        rsMap.put("res", "ok");
    }catch (Exception e){
        e.printStackTrace();
        rsMap.put("res", "fail");
    }
    return rsMap;
}

private void filesDelete(List<ProductFileTbl> fileTblList,
                         HttpSession session)
    throws Exception{
    log.info("filesDelete()");
    String realPath = session.getServletContext()
            .getRealPath("/");
    realPath += "upload/";

    for (ProductFileTbl pf : fileTblList){
        File file = new File(realPath + pf.getProductFileSysname());
        if(file.exists()){
            file.delete();
        }
    }
}


}

