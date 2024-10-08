package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.IwcContentsTbl;
import com.icia.ggdserver.entity.IwcTbl;
import com.icia.ggdserver.repository.IwcContentsRepository;
import com.icia.ggdserver.repository.IwcTblRepository;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;

@Service
@Slf4j
public class IdealWorldCupService {
    @Autowired
    private IwcTblRepository iwcRepo;

    @Autowired
    private IwcContentsRepository conRepo;

    public String insertIwc(IwcTbl iwc,
                              List<MultipartFile> files,
                              HttpSession session){
        log.info("insertIwc()");
        String result = null;//react 쪽으로 보내는 처리 결과 메시지.

        try {
            iwcRepo.save(iwc);
            log.info("bnum : {}", iwc.getIwcCode());

            if(files != null && !files.isEmpty()){
                fileUpload(files, session, iwc.getIwcCode());
            }
            result = "ok";
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

}
