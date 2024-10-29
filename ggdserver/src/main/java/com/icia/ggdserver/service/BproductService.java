package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.BproductTbl;
import com.icia.ggdserver.repository.BproductRepository;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Service
@Slf4j
public class BproductService {
    @Autowired
    private BproductRepository bpRepo;
    //상품 목록 레포지터리

    @Autowired
    private BproductRepository bpfRepo;
    //상품 이미지 레포지터리

    public String insertBproduct(BproductTbl bproductTbl,
                                 List<MultipartFile> files,
                                 HttpSession session) {
        log.info("insertBproduct()");
        String result = null;

        try {
            bpRepo.save(bproductTbl);
            log.info("bnum : {} ", bproductTbl.getBpnum());

            if (files != null && !files.isEmpty()){
                uploadFile(files, session, bproductTbl.getBpnum());
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
                            long bpnum) throws Exception{
        log.info("uploadFile");

        String realPath = session.getServletContext().getRealPath("/");

        realPath += "upload/";

        File folder = new File(realPath);

        if (folder.isDirectory() == false){
            folder.mkdir();
        }

        for (MultipartFile mf : files){
            String boriname = mf.getOriginalFilename();


        }
    }

}
