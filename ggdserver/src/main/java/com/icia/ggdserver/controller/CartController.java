package com.icia.ggdserver.controller;

import com.icia.ggdserver.service.CartService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
public class CartController {

    @Autowired
    private CartService cServ;

    // 장바구니 목록 가져오기
    @GetMapping("cartlist")
    public Map<String, Object> getCartList(@RequestParam(required = false, defaultValue = "1") Integer pageNum,
                                           @RequestParam String cnid) {
        log.info("getCartList() - cnid: {}", cnid);
        Map<String, Object> res = cServ.getCartList(pageNum, cnid);
        return res;
    }

    // 장바구니에 상품 추가
    @GetMapping("setcart")
    public String setCart(@RequestParam String cnid,
                          @RequestParam long productCode,
                          @RequestParam int quantity) {
        // 상품 재고 수량 조회
        int productStock = cServ.getProductStockByCode(productCode);

        // 수량이 재고를 초과하는지 확인
        if (quantity > productStock) {
            return "error: 수량이 재고를 초과합니다.";
        }

        // 장바구니에 상품 추가
        return cServ.getCart(cnid, productCode, productStock, quantity);
    }

    // 여러 장바구니 항목 삭제
    @PostMapping("deleteCart")
    public String deleteCart(@RequestBody List<Long> cartCodes) {
        try {
            cServ.deleteMultipleCarts(cartCodes);
            return "ok";  // 삭제 성공
        } catch (Exception e) {
            e.printStackTrace();
            return "error: 삭제 중 오류 발생";  // 오류 발생 시
        }
    }

    // 장바구니에 중고 상품 추가
    @GetMapping("setusedcart")
    public String setUsedCart(@RequestParam String cnid,
                              @RequestParam long usedCode,
                              @RequestParam int quantity) {
        // 중고 상품 재고 수량 조회
        int usedStock = cServ.getUsedStockByCode(usedCode);

        // 수량이 재고를 초과하는지 확인
        if (quantity > usedStock) {
            return "error: 중고 상품 수량이 재고를 초과합니다.";
        }

        // 장바구니에 중고 상품 추가
        return cServ.getUsedCart(cnid, usedCode, usedStock, quantity);
    }
}
