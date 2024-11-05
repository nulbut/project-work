package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.CartTbl;
import com.icia.ggdserver.entity.ProductFileTbl;
import com.icia.ggdserver.entity.ProductTbl;
import com.icia.ggdserver.repository.BoardFileRepository;
import com.icia.ggdserver.repository.CartRepository;
import com.icia.ggdserver.repository.ProductRegistrationRepository;
import com.icia.ggdserver.repository.ProductTblRepository;
import jakarta.servlet.http.HttpSession;
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

@Slf4j
@Service
public class CartService {
    @Autowired
    private CartRepository cRepo;

    @Autowired
    private ShoppingMallService sServ;

    @Autowired
    private ProductTblRepository pdRepo;

    @Autowired
    private ProductRegistrationRepository pdrRepo;


    public Map<String, Object> getCartList(Integer pageNum, String cnid) {
        log.info("getCartList() cnid: {}", cnid);

        if (pageNum == null) {
            pageNum = 1;
        }

        int listCnt = 5;

        Pageable pb = PageRequest.of((pageNum - 1), listCnt,
                Sort.Direction.DESC, "cartCode");

        Page<CartTbl> result = cRepo.findByCartCodeGreaterThanAndCnid(0L, cnid, pb);
        List<CartTbl> Clist = result.getContent();

        int totalPage = result.getTotalPages();

        for (CartTbl cartTbl : Clist ){
            cartTbl.setProductin(sServ.getProduct(cartTbl.getProductCode()));
        }

        Map<String, Object> res = new HashMap<>();
        res.put("totalPage", totalPage);
        res.put("pageNum", pageNum);
        res.put("Clist", Clist);
        res.put("cnid", cnid);

        return res;
    }

    public int getProductStockByCode(long productCode) {
        // 예시: productCode로 상품을 조회하고, 해당 상품의 stock을 반환
        ProductTbl product = pdRepo.findById(productCode).orElse(null);
        return (product != null) ? product.getProductStock() : 0;
    }

    public String getCart(String cnid, long productCode, int productStock, int quantity) {
        if (quantity > productStock) {
            return "상품 수량이 부족합니다.";
        }

        CartTbl cartItem = new CartTbl();
        cartItem.setQuantity(quantity);
        cartItem.setProductCode(productStock);
        cartItem.setCnid(cnid);
        cartItem.setProductCode(productCode);
        cRepo.save(cartItem);
        return "ok"; // 성공적으로 추가
    }

//    //장바구니 삭제
//    @Transactional
//    public void deleteCart(long cartCode) {
//        // 삭제 처리
//        cRepo.deleteByCartCode(cartCode);
//    }

    public void deleteMultipleCarts(List<Long> cartCodes) {
        if (cartCodes != null && !cartCodes.isEmpty()) {
            cRepo.deleteAllById(cartCodes);  // Repository에서 제공하는 메서드를 사용해 삭제
        }
    }
}