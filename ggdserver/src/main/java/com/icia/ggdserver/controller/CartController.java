package com.icia.ggdserver.controller;

import com.icia.ggdserver.entity.CartTbl;
import com.icia.ggdserver.entity.ProductTbl;
import com.icia.ggdserver.service.CartService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@RestController
public class CartController {
    @Autowired
    private CartService cServ;
    //장바구니 리스트
    @GetMapping("cartlist")
    public Map<String, Object> getcartlist(@RequestParam Integer pageNum,
                                           @RequestParam String cnid) {
        log.info("getcartlist");

        Map<String, Object> res = cServ.getCartList(pageNum,cnid);

        return res;
    }
    @GetMapping("setcart")
    public String setcart(@RequestParam String cnid,
                          @RequestParam long productCode,
                          @RequestParam int quantity) {
        // 상품의 재고 수량을 서버에서 조회
        int productStock = cServ.getProductStockByCode(productCode);

        // 재고 수량보다 많은 수량을 요청하는 경우
        if (quantity > productStock) {
            return "error: 수량이 재고를 초과합니다.";
        }

        // 장바구니에 담기 로직
        return cServ.getCart(cnid, productCode, productStock, quantity);
    }


    // 여러 장바구니 항목 삭제
    @PostMapping("deleteCart")
    public String deleteCart(@RequestBody List<Long> cartCodes) {
        try {
            // 서비스 계층에 삭제 로직을 위임
            cServ.deleteMultipleCarts(cartCodes);
            return "ok"; // 삭제 성공
        } catch (Exception e) {
            e.printStackTrace();
            return "error"; // 오류 발생 시
        }
    }

    @GetMapping("setusedcart")
    public String setusedcart(@RequestParam String cnid,
                          @RequestParam long usedCode,
                          @RequestParam int quantity) {
        // 상품의 재고 수량을 서버에서 조회
        int usedStock = cServ.getUsedStockByCode(usedCode);

        // 재고 수량보다 많은 수량을 요청하는 경우
        if (quantity > usedStock) {
            return "error: 수량이 재고를 초과합니다.";
        }

        // 장바구니에 담기 로직
        return cServ.getusedCart(cnid, usedCode, usedStock, quantity);
    }

    //    // 장바구니 항목 삭제
//    @PostMapping("deleteCart")
//    public void deleteCart(@RequestBody Map<String, Long> request) {
//        long cartCode = request.get("cartCode");
//
//        // 장바구니 삭제 서비스 호출
//        cServ.deleteCart(cartCode);
//    }

}




