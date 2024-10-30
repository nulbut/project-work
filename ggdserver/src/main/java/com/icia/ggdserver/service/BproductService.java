package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.BproductFileTbl;
import com.icia.ggdserver.entity.BproductTbl;
import com.icia.ggdserver.repository.BproductFileRepository;
import com.icia.ggdserver.repository.BproductRepository;
import com.icia.ggdserver.repository.ProductRegistrationRepository;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.Mapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class BproductService {
    @Autowired
    private BproductRepository bpRepo;
    //상품 목록 레포지터리

    @Autowired
    private BproductFileRepository bpfRepo;
    //상품 이미지 레포지터리


    //상품 작성
    public String insertBproduct(BproductTbl bproductTbl,
                                 List<MultipartFile> bfiles,
                                 HttpSession session) {
        log.info("insertBproduct()");
        String bresult = null;

        try {
            bpRepo.save(bproductTbl);
            log.info("bnum : {} ", bproductTbl.getBpnum());

            if (bfiles != null && !bfiles.isEmpty()){
                buploadFile(bfiles, session, bproductTbl.getBpnum());
            }
            bresult = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            bresult = "fail";
        }
        return bresult;
    }// insertBproduct end

    // 파일 업로드
    private void buploadFile(List<MultipartFile> files,
                            HttpSession session,
                            long bpnum) throws Exception{
        log.info("uploadFile");

        String realPath = session.getServletContext().getRealPath("/");

        realPath += "upload/";

        File folder = new File(realPath);

        if (folder.isDirectory() == false){
            folder.mkdir();
        }

        for (MultipartFile bmf : files){
            String boriname = bmf.getOriginalFilename();

            BproductFileTbl bproductFileTbl = new BproductFileTbl();
            bproductFileTbl.setBproductFileOriname(boriname);
            bproductFileTbl.setBproductFileCode(bpnum);

            String sysname = System.currentTimeMillis()
                    + boriname.substring(boriname.lastIndexOf("."));
            bproductFileTbl.setBproductFileOriname(sysname);

            File file = new File(realPath + sysname);
            bmf.transferTo(file);

            bpfRepo.save(bproductFileTbl);
        }
    } //uploadFile end



    public BproductTbl getBproduct(long bproductFileCode) {
        log.info("bpnum()");
        //상품 가져오기
        BproductTbl bproductTbl = bpRepo.findById(bproductFileCode).get();
        //첨부 이미지 파일 목록 가져와서 담기
        List<BproductFileTbl> bpfList = bpfRepo.findByBproductFileCode(bproductFileCode);

        bproductTbl.setBproductFileTblList(bpfList);

        return bproductTbl;
    } //getBproduct end

    @Transactional
    public Map<String, String> bpdDelete(long bproductFileCode,
                                         HttpSession session) {
        log.info("bpdDelete()");
        Map<String, String> brsMap = new HashMap<>();

        try {
            //파일 삭제
            List<BproductFileTbl> bfileTblList = bpfRepo.findByBproductFileCode(bproductFileCode);
            if(!bfileTblList.isEmpty()){
                bfileDelete(bfileTblList, session);
            }
            //상품(DB)삭제
            bpRepo.deleteById(bproductFileCode);
            //파일 목록(DB) 삭제
            bpfRepo.deleteByBproductFileCode(bproductFileCode);

            brsMap.put("res","ok");
        }catch (Exception e){
            e.printStackTrace();
            brsMap.put("res","fail");
        }
        return brsMap;
    }

    private void bfileDelete(List<BproductFileTbl> bfileTblList,
                             HttpSession session)
            throws Exception{
        log.info("bfileDelete()");
        String brealPath = session.getServletContext()
                .getRealPath("/");
        brealPath += "upload/";

        for (BproductFileTbl bproductFileTbl : bfileTblList){
            File file = new File(brealPath + bproductFileTbl + bproductFileTbl.getBproductFileOriname());
            if (file.exists()){
                file.delete();
            }
        }
    }

//    public Map<String, Object> getBproductList(Integer bpageNum) {
//        log.info("getBproductList()");
//
//        if (bpageNum == null){
//            bpageNum = 1;
//        }
//        //나머지 더 쓰기
//    }
}//class end
