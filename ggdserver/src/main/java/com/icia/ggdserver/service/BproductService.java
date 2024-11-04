package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.BproductFileTbl;
import com.icia.ggdserver.entity.BproductTbl;
import com.icia.ggdserver.entity.ProductTbl;
import com.icia.ggdserver.repository.BproductFileRepository;
import com.icia.ggdserver.repository.BproductRepository;
import com.icia.ggdserver.repository.ProductRegistrationRepository;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
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
    private BproductRepository bpdRepo;
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
            bpdRepo.save(bproductTbl);
            log.info("bnum : {} ", bproductTbl.getBpnum());

            if (bfiles != null && !bfiles.isEmpty()){
                buploadFile(bfiles, session, bproductTbl);
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
                             BproductTbl bproductTbl) throws Exception{
        log.info("buploadFile");

        String realPath = session.getServletContext().getRealPath("/");

        log.info(realPath);
        realPath += "productupload/";

        File folder = new File(realPath);

        if (folder.isDirectory() == false){
            folder.mkdir(); //productupload 폴더 없으면 생성
        }
        int fcnt = 0;
        //파일 목록에서 하나씩 꺼내서 저장
        for (MultipartFile bmf : files){
            String boriname = bmf.getOriginalFilename();

            BproductFileTbl bproductFileTbl = new BproductFileTbl();
            bproductFileTbl.setBproductfileoriname(boriname); //원래 파일명
            bproductFileTbl.setBproductfilenum(bproductTbl.getBpnum()); //게시글번호

            String sysname = System.currentTimeMillis()
                    + boriname.substring(boriname.lastIndexOf("."));
            bproductFileTbl.setBproductfilesysname(sysname);

            if(fcnt == 0) {
                bproductTbl.setBproductFileSysnameM(sysname);
            }

            fcnt++;
            //파일저장
            File file = new File(realPath + sysname);
            bmf.transferTo(file);

            //파일정보를 DB에 저장
            bpfRepo.save(bproductFileTbl);
        }
    } //uploadFile end



    public BproductTbl getBproduct(long bpnum) {
        log.info("getBproduct()");
        //상품 가져오기
        BproductTbl bproductTbl =  bpdRepo.findById(bpnum).get();
        //첨부 이미지 파일 목록 가져와서 담기
        List<BproductFileTbl> bpfList = bpfRepo.findByBproductfilenum(bpnum);

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
            List<BproductFileTbl> bfileTblList = bpfRepo.findByBproductfilenum(bproductFileCode);
            if(!bfileTblList.isEmpty()){
                bfileDelete(bfileTblList, session);
            }
            //상품(DB)삭제
            bpdRepo.deleteById(bproductFileCode);
            //파일 목록(DB) 삭제
            bpfRepo.deleteByBproductfilenum(bproductFileCode);

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
            File file = new File(brealPath + bproductFileTbl.getBproductfilesysname());
            if (file.exists()){
                file.delete();
            }
        }
    }

    public Map<String, Object> getBproductList(Integer pageNum, String bsellerId) {
        log.info("getBproductList() bsellerId : {}", bsellerId);

        if (pageNum == null){
            pageNum = 1;
        }
        int listCnt  = 8;

        Pageable pb = PageRequest.of((pageNum - 1), listCnt,
                Sort.Direction.DESC, "bpnum");

        Page<BproductTbl> result =bpdRepo.findByBpnumGreaterThanAndBsellerId(0L, bsellerId, pb);
        //page 객체를 list로 변환 후 전송
        List<BproductTbl> bList = result.getContent();
        //blist에 저장
        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("bList", bList);
        res.put("totalPage",totalPage);
        res.put("pageNum",pageNum);
        res.put("bsellerId",bsellerId);


        return res;
    }
}//class end
