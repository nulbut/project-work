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
                        long productCode) throws Exception{
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
        bf.setProductFileCode(productCode);

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

    int totalPages = result.getTotalPages();

    Map<String, Object> res = new HashMap<>();
    res.put("bList", bList);
    res.put("totalPages", totalPages);
    res.put("pageNum", pNum);

    return res;
}

}

