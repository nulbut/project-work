package com.icia.ggdserver.controller;

import com.icia.ggdserver.entity.CartTbl;
import com.icia.ggdserver.entity.ProductTbl;
import com.icia.ggdserver.service.CartService;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
public class CartController {
    @Autowired
    private CartService cServ;

    @GetMapping("cartlist")
    public Map<String, Object> getcartlist(@RequestParam Integer pageNum,
                                           @RequestParam String cnid) {
        log.info("getcartlist");

        Map<String, Object> res = cServ.getCartList(pageNum,cnid);

        return res;
    }

    @GetMapping("setcart")
    public String setcart(@RequestParam String cnid,
                          @RequestParam long productCode) {
        return cServ.getCart(cnid, productCode);
    }


}
