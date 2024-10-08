package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.IwcTbl;
import com.icia.ggdserver.repository.IwcTblRepository;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@Slf4j
public class IdealWorldCupService {
    @Autowired
    private IwcTblRepository iwcRepo;

    public String insertIwc(IwcTbl iwc,
                              List<MultipartFile> files,
                              HttpSession session){
        log.info("insertIwc()");
        String result = null;//react 쪽으로 보내는 처리 결과 메시지.

        try {
            iwcRepo.save(iwc);
            log.info("bnum : {}", iwc.getIwcCode());

//            if(files != null && !files.isEmpty()){
//                fileUpload(files, session, board.getBnum());
//            }
            result = "ok";
        } catch (Exception e){
            e.printStackTrace();
            result = "fail";
        }

        return result;
    }
}
