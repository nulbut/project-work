package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.*;
import com.icia.ggdserver.repository.BproductRepository;
import com.icia.ggdserver.repository.DibsRepository;
import com.icia.ggdserver.repository.ProductTblRepository;
import com.icia.ggdserver.repository.UsedTblRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
public class DibsService {

    @Autowired
    private DibsRepository dRepo;

    @Autowired
    private ShoppingMallService sServ;

    @Autowired
    private UsedTblRepository udRepo;

    @Autowired
    private BproductRepository bpdRepo;

    // 찜 한 데이터
    public Map<String, Object> getDibsList(Integer pageNum, String dnid) {
        log.info("getDibsList() dnid: {} ", dnid);

        if (pageNum == null) {
            pageNum = 1;
        }
        int limitCnt = 10;
        Pageable pb = PageRequest.of((pageNum - 1), limitCnt, Sort.Direction.DESC,"dibsCode");

        // 찜 데이터 가져오기
        Page<DibsTbl> result = dRepo.findBydibsCodeGreaterThanAndDnid(0L, dnid, pb);
        List<DibsTbl> Dlist = result.getContent();
        int totalPage = result.getTotalPages();

        for (DibsTbl dibsItem : Dlist) {
            if (dibsItem != null) {
                // Null이 아니면 처리
                if (dibsItem.getUsedCode() != 0L) {
                    UsedProductTbl usedProduct = udRepo.findById(dibsItem.getUsedCode()).orElse(null);
                    if (usedProduct != null) {
                        dibsItem.setUsedinfo(usedProduct); // 중고 상품 데이터 세팅
                    }
                }
                // 중고 상품 코드가 없고, 상품 코드가 있을 경우
                else if (dibsItem.getBpnum() != 0) {
                    BproductTbl bproduct = bpdRepo.findById(dibsItem.getBpnum()).orElse(null);
                    if (bproduct != null) {
                        dibsItem.setBproductinfo(bproduct); // 상품 데이터 세팅
                    }
                }
            }
        }

        //결과 반환
        Map<String, Object> res = new HashMap<>();
        res.put("totalPage", totalPage);
        res.put("Dlist", Dlist);
        res.put("pageNum", pageNum);
        res.put("dnid", dnid);

        return res;
    }
    // 상품 찜 하기
    public String getDibs(String dnid, Long bpnum) {
        try {
            if (bpnum == null || dnid == null) {
                return "상품이나 아이디가 없습니다."; // 필수 파라미터가 없는 경우
            }

            // 상품에 대한 찜 중복 처리
            DibsTbl existingDibs = dRepo.findByDnidAndProductCode(dnid, bpnum);
            if (existingDibs != null) {
                return "이미 찜한 상품입니다."; // 이미 찜한 중고 상품
            }

            DibsTbl dibsItem = new DibsTbl();
            dibsItem.setDnid(dnid);
            dibsItem.setBpnum(bpnum); // 중고 상품 코드 설정
            dRepo.save(dibsItem);
            return "ok"; // 중고 상품 찜 성공
        } catch (Exception e) {
            log.error("Error while adding dibs for dnid {} and productCode {}: {}", dnid, bpnum, e.getMessage());
            return "error: 찜하기가 안됬습니다.";
        }
    }


    public String getUsedDibs(String dnid, Long usedCode) {
        try {
            if (usedCode == null || dnid == null) {
                return "error: 상품이나 아이디가 없습니다."; // 필수 파라미터가 없는 경우
            }

            // 중고 상품에 대한 찜 중복 처리
            DibsTbl existingDibs = dRepo.findByDnidAndUsedCode(dnid, usedCode);
            if (existingDibs != null) {
                return "이미 찜한 상품입니다."; // 이미 찜한 중고 상품
            }

            DibsTbl dibsItem = new DibsTbl();
            dibsItem.setDnid(dnid);
            dibsItem.setUsedCode(usedCode); // 중고 상품 코드 설정
            dRepo.save(dibsItem);
            return "ok"; // 중고 상품 찜 성공
        } catch (Exception e) {
            log.error("Error while adding dibs for dnid {} and usedCode {}: {}", dnid, usedCode, e.getMessage());
            return "error: 찜하기가 안됬습니다.";
        }
    }

    public void deletMultioleDibss(List<Long> dibsCodes) {
        if(dibsCodes != null && !dibsCodes.isEmpty()) {
            dRepo.deleteAllById(dibsCodes);
        }
    }

}
