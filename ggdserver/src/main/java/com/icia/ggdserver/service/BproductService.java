
package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.*;
import com.icia.ggdserver.repository.*;
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
import java.util.ArrayList;
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

    @Autowired
    private OrderDetailRepository odrRepo;


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

    //체크 삭제
    private void bfileDelete(List<BproductFileTbl> bfileTblList,
                             HttpSession session)
            throws Exception{
        log.info("bfileDelete()");
        String brealPath = session.getServletContext()
                .getRealPath("/");
        brealPath += "productupload/";

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



    @Transactional
    public String deleteCheckedList(List<Long> ckList, HttpSession session) {
        log.info("deleteCheckedList()");
        String result = "";

        try {
            bpdRepo.deleteAllByIds(ckList);
            List<String> delFileList = bpfRepo.selectBproductfilesysnames(ckList);
            deleteFileList(delFileList, session);
            bpfRepo.deleteAllByBproductfilenums(ckList);
            result = "ok";
        }catch (Exception e){
            e.printStackTrace();
            result = "fail";
        }

        return result;
    }

    private void deleteFileList(List<String> delFileList, HttpSession session) throws Exception{
        log.info("deleteFileList()");
        String brealPath = session.getServletContext().getRealPath("/");
        brealPath += "productupload/";

        for (String fileSysname : delFileList){
            File file = new File(brealPath + fileSysname);
            if (file.exists()){
                file.delete();
            }
        }
    }

    //상품 수정
    @Transactional
    public String updateBproduct(BproductTbl bproductTbl,
                                 List<MultipartFile> bupdatefiles,
                                 HttpSession session) {
        log.info("updateBproduct()");
        String bresult = null;

        try {

            if (bupdatefiles != null && !bupdatefiles.isEmpty()) {
                List<Long> deleimg = new ArrayList<>();
                deleimg.add( bproductTbl.getBpnum());
                List<String> deleimgList = bpfRepo.selectBproductfilesysnames(deleimg);
                deleteFileList(deleimgList,session);
                bpfRepo.deleteAllByBproductfilenums(deleimg);
            }


            if (bupdatefiles != null && !bupdatefiles.isEmpty()){
                buploadFile(bupdatefiles, session, bproductTbl);
            }



            bpdRepo.save(bproductTbl);
            log.info("bnum : {} ", bproductTbl.getBpnum());

            bresult = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            bresult = "fail";
        }
        return bresult;
    }// updateBproduct end

    //재고수정
    @Transactional
    public String updateBproductStock(BproductTbl bproductTbl,
                                      HttpSession session) {
        log.info("updateBproductStock()");
        String stockresult = null;

        try {
            bpdRepo.save(bproductTbl);
            log.info("bnum : {}", bproductTbl.getBpnum());

            stockresult = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            stockresult = "fail";
        }
        return stockresult;
    }//updateBproductStock end

    //상태와 재입고 관리
    @Transactional
    public String updateBproductStockcon(BproductTbl bproductTbl, HttpSession session) {
        log.info("updateBproductStockcon()");
        String stockresult = null;

        try {
            //재고에 따른 상태 업데이트
            if (bproductTbl.getBpwarestock() <=0 ) {
                bproductTbl.setBcondition("품절");
            } else {
                bproductTbl.setBcondition("판매중");
            }

            //저장
            bpdRepo.save(bproductTbl);
            log.info("bpnum : {}", bproductTbl.getBpnum());


            stockresult = "ok";
        } catch (Exception e) {
            e.printStackTrace();
            stockresult = "fail";
        }
        return stockresult;
    }// updateBproductStockcon end

    public long countOutOfStockProducts() {
        // '품절' 상태인 상품 개수 계산
        return bpdRepo.countByBcondition("품절");
    }

    //주문건수 만큼 창고재고 수 줄이기
    @Transactional
    public void deductStock() {
        // 주문 내역 가져오기
        List<OrderDetailTbl> orderDetails = (List<OrderDetailTbl>) odrRepo.findAll();

        for (OrderDetailTbl order : orderDetails) {
            long productCode = order.getProduct_code();
            int quantity = order.getQuantity();

            // 상품 테이블에서 product_code와 일치하는 상품 찾기
            BproductTbl product = bpdRepo.findByBpnum(productCode);

            if (product != null) {
                // 재고를 quantity만큼 차감
                int currentStock = product.getBpwarestock();
                if (currentStock >= quantity) {
                    product.setBpwarestock(currentStock - quantity);
                    bpdRepo.save(product); // 변경된 상품 재고 저장
                } else {
                    // 재고 부족 처리 로직 추가 (예: 예외 발생)
                    throw new IllegalStateException("재고가 부족합니다. 상품 ID: " + productCode);
                }
            }
        }
    }



//    public Map<String, Object> getBproductListNormal(Integer pageNum) {
//        log.info("getBproductList() bsellerId : {}", bsellerId);
//
//        if (pageNum == null){
//            pageNum = 1;
//        }
//        int listCnt  = 8;
//
//        Pageable pb = PageRequest.of((pageNum - 1), listCnt,
//                Sort.Direction.DESC, "bpnum");
//
//        Page<BproductTbl> result =bpdRepo.findByBpnumGreaterThanAndBsellerId(0L, bsellerId, pb);
//        //page 객체를 list로 변환 후 전송
//        List<BproductTbl> bList = result.getContent();
//        //blist에 저장
//        int totalPage = result.getTotalPages();
//
//        Map<String, Object> res = new HashMap<>();
//        res.put("bList", bList);
//        res.put("totalPage",totalPage);
//        res.put("pageNum",pageNum);
//
//
//        return res;
//    }
}//class end