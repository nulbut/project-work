package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.BoardFileTbl;
import com.icia.ggdserver.entity.CartTbl;
import com.icia.ggdserver.repository.BoardFileRepository;
import com.icia.ggdserver.repository.CartRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
public class CartService {
    @Autowired
    private CartRepository cRepo;

    @Autowired
    private BoardFileRepository bfRpo;

    public Map<String, Object> getCartList(Integer pageNum, String cnid) {
        log.info("getCartList() cnid: {}", cnid);

        if (pageNum == null){
            pageNum = 1;
        }

        int listCnt = 5;

        Pageable pb = PageRequest.of((pageNum - 1), listCnt,
                Sort.Direction.DESC,"cartCode");

        Page<CartTbl> result = cRepo.findByCartCodeGreaterThanAndAndCnid(0L, cnid, pb);
        List<CartTbl> Clist = result.getContent();

        int totalPage = result.getTotalPages();

        Map<String, Object> res = new HashMap<>();
        res.put("totalPage", totalPage);
        res.put("pageNum", pageNum);
        res.put("Clist", Clist);
        res.put("cnid", cnid);

        return res;


    }
}
