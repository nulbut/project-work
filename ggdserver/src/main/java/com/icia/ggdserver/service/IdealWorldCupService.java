package com.icia.ggdserver.service;

import com.icia.ggdserver.dto.TurnImgDto;
import com.icia.ggdserver.entity.IwcContentsTbl;
import com.icia.ggdserver.entity.IwcTbl;
import com.icia.ggdserver.repository.IwcContentsRepository;
import com.icia.ggdserver.repository.IwcTblRepository;
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

    public Map<String, Object> getBoardList(Integer pNum){
        log.info("getBoardList()");

        if(pNum == null){
            pNum = 1;
        }

        //페이지 당 보여질 게시글 개수
        int listCnt = 15;

        //페이징 조건 처리 객체 생성(Pageable)
        Pageable pb = PageRequest.of((pNum - 1), listCnt,
                Sort.Direction.DESC, "iwcCode");
        //PageRequest.of(페이지번호, 페이지당 게시글 개수, 정렬방식, 컬럼명)

        Page<IwcTbl> result = null;
        result = iwcRepo.findByIwcCodeGreaterThanAndIwcPublicEquals(0L,1L, pb);
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
}
