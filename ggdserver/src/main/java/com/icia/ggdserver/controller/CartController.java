package com.icia.ggdserver.controller;

import com.icia.ggdserver.entity.CartTbl;
import com.icia.ggdserver.repository.CartRepository;
import com.icia.ggdserver.service.CartService;
import jakarta.servlet.http.HttpSession;
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

    @Autowired
    private HttpSession session; // HttpSession을 주입받습니다.

    // 장바구니 목록 가져오기
    @GetMapping("cartlist")
    public Map<String, Object> getCartList(@RequestParam(required = false, defaultValue = "1") Integer pageNum,
                                           @RequestParam String cnid) {
        log.info("getCartList() - cnid: {}", cnid);

        Map<String, Object> res = cServ.getCartList(pageNum, cnid);

        // 세션에서 Reloaded 플래그 확인
        String reloadFlag = (String) session.getAttribute("Reloaded");
        if ("true".equals(reloadFlag)) {
            // 새로고침인 경우 서버에서 수량 초기화
            cServ.resetCartQuantity(cnid);  // 수량 초기화 처리
            session.removeAttribute("Reloaded");  // 초기화 후 세션에서 플래그 제거
        }

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

    // 장바구니 수량 저장
    @PostMapping("updateCart")
    public String updateCartQuantity(@RequestBody CartTbl cart) {
        boolean isUpdated = cServ.updateCartQuantity(cart);
        if (isUpdated) {
            return "ok";
        } else {
            return "fail";
        }
    }

    @PostMapping("resetCartQuantity")
    public String resetCartQuantity(@RequestBody Map<String, String> requestBody) {
        String cnid = requestBody.get("cnid");
        log.info("resetCartQuantity() - cnid: {}", cnid);

        // 수량 초기화 처리
        cServ.resetCartQuantity(cnid);

        // 수량 초기화 후 세션에 플래그 설정
        session.setAttribute("Reloaded", "true");

        return "ok"; // 초기화 성공
    }


}
