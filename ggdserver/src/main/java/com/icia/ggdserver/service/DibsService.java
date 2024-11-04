package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.DibsTbl;
import com.icia.ggdserver.repository.DibsRepository;
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


    public Map<String, Object> getDibsList(Integer pageNum, String dnid) {
        log.info("getDibsList() dnid: {} ", dnid);

        if (pageNum == null) {
            pageNum = 1;
        }
        int limitCnt = 5;

        Pageable pb = PageRequest.of((pageNum - 1), limitCnt,
                Sort.Direction.DESC,"dibsCode");

        Page<DibsTbl> result = dRepo.findBydibsCodeGreaterThanAndDnid(0L, dnid, pb);
        List<DibsTbl> Dlist = result.getContent();

        int totalPage = result.getTotalPages();


        for (DibsTbl dibsTbl : Dlist) {
            dibsTbl.setProductinfo(sServ.getProduct(dibsTbl.getProductCode()));
        }
        Map<String, Object> res = new HashMap<>();
        res.put("totalPage", totalPage);
        res.put("Dlist", Dlist);
        res.put("pageNum", pageNum);
        res.put("dnid", dnid);

        return res;
    }

    public String getDibs(String dnid, long productCode) {

        DibsTbl dibsItem = new DibsTbl();
        dibsItem.setDnid(dnid);
        dibsItem.setProductCode(productCode);
        dRepo.save(dibsItem);
        return "ok";
    }


}
