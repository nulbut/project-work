package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.*;
import com.icia.ggdserver.repository.*;
import com.icia.ggdserver.service.ShoppingMallService;
import com.icia.ggdserver.service.UsedShoppingService;
import jakarta.servlet.http.HttpSession;
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
    private ProductTblRepository pdRepo;

    @Autowired
    private UsedTblRepository udRepo;

    @Autowired
    private UsedFileRepository udfRepo;

    @Autowired
    private BproductRepository bpdRepo;


    // 장바구니 리스트 가져오기
    public Map<String, Object> getCartList(Integer pageNum, String cnid) {
        log.info("getCartList() cnid: {}", cnid);

        if (pageNum == null) {
            pageNum = 1;
        }

        int listCnt = 10; // 한 페이지 당 항목 수
        Pageable pb = PageRequest.of(pageNum - 1, listCnt, Sort.Direction.DESC, "cartCode");

        // 장바구니 데이터 가져오기
        Page<CartTbl> result = cRepo.findByCartCodeGreaterThanAndCnid(0L, cnid, pb);
        List<CartTbl> Clist = result.getContent();
        int totalPage = result.getTotalPages();

        // 장바구니 항목들에 대한 데이터 추가 처리
        for (CartTbl cartItem : Clist) {
            if (cartItem != null) {
                if (cartItem.getUsedCode() != 0L) {
                    UsedProductTbl usedProduct = udRepo.findById(cartItem.getUsedCode()).orElse(null);
                    if (usedProduct != null) {
                        List<UsedproductFileTbl> usedFile = udfRepo.findByUsedFileNum(usedProduct.getUsedCode());
                        usedProduct.setUsedproductFileTblList(usedFile);
                        cartItem.setUsedin(usedProduct);

                        // 중고 상품 데이터 세팅
                    }
                }
                // 중고 상품 코드가 없고, 상품 코드가 있을 경우
                else if (cartItem.getBpnum() != 0) {
                    BproductTbl bproduct = bpdRepo.findById(cartItem.getBpnum()).orElse(null);
                    if (bproduct != null) {
                        cartItem.setBproductin(bproduct); // 상품 데이터 세팅
                    }
                }
            }
        }

        // 결과 반환
        Map<String, Object> res = new HashMap<>();
        res.put("totalPage", totalPage);
        res.put("pageNum", pageNum);
        res.put("Clist", Clist);
        res.put("cnid", cnid);

        return res;
    }

    // 공통 메서드: 상품 또는 중고 상품의 재고 확인
    private int getStockByCode(long code, boolean isUsed) {
        if (isUsed) {
            UsedProductTbl usedProduct = udRepo.findById(code).orElse(null);
            return (usedProduct != null) ? usedProduct.getUsedStock() : 0;
        } else {
            BproductTbl bproduct = bpdRepo.findById(code).orElse(null);
            return (bproduct != null) ? bproduct.getBpwarestock() : 0;
        }
    }

//    // 상품 재고 수량 조회
//    public int getProductStockByCode(long productCode) {
//        return getStockByCode(productCode, false); // 상품 재고 조회
//    }

    // 중고 상품 재고 수량 조회
    public int getUsedStockByCode(long usedCode) {
        return getStockByCode(usedCode, true); // 중고 상품 재고 조회
    }

    //입점 상품 수량 조회
    public int getBproductStockByCode(long bpnum) {return  getStockByCode(bpnum, false); // 입점 상품 재고 조회
    }

    //장바구니에 입점상품 추가
    public String getStoreCart(String cnid, long bpnum, int quantity ,int bpwarestock) {
        log.info("{} : {} ",quantity,bpwarestock);
        if (quantity > bpwarestock) {
            return "상품 수량이 부족합니다.";
        }

        // 장바구니에서 해당 상품이 이미 있는지 확인
        CartTbl existingCartItem = cRepo.findByCnidAndBpnum(cnid, bpnum);
        if (existingCartItem != null) {
            // 이미 장바구니에 해당 상품이 존재하는 경우
            return "이미 장바구니에 해당 상품이 있습니다.";
        }

        // 장바구니에 상품 추가
        CartTbl cartusedItem = new CartTbl();
        cartusedItem.setQuantity(quantity);
        cartusedItem.setCnid(cnid);
        cartusedItem.setBpnum(bpnum);
        cRepo.save(cartusedItem);

        return "ok"; // 성공적으로 추가
    }

    // 장바구니에 중고 상품 추가
    public String getUsedCart(String cnid, long usedCode,int quantity ,int usedStock) {
        log.info("{} : {} ",quantity,usedStock);

        if (quantity > usedStock) {
            return "상품 수량이 부족합니다.";
        }


        // 장바구니에서 해당 상품이 이미 있는지 확인
        CartTbl existingCartItem = cRepo.findByCnidAndUsedCode(cnid, usedCode);
        if (existingCartItem != null) {
            // 이미 장바구니에 해당 상품이 존재하는 경우
            return "이미 장바구니에 해당 상품이 있습니다.";
        }


        // 장바구니에 상품 추가
        CartTbl cartusedItem = new CartTbl();
        cartusedItem.setQuantity(quantity);
        cartusedItem.setCnid(cnid);
        cartusedItem.setUsedCode(usedCode);

        cRepo.save(cartusedItem);

        return "ok"; // 성공적으로 추가
    }

    // 여러 장바구니 항목 삭제
    public void deleteMultipleCarts(List<Long> cartCodes) {
        if (cartCodes != null && !cartCodes.isEmpty()) {
            cRepo.deleteAllById(cartCodes);  // Repository에서 제공하는 메서드를 사용해 삭제
        }
    }

    //장바구니 수량 업데이트
    public boolean updateCartQuantity(CartTbl cart) {
        // 예시: 수량이 1 이상인지 체크
        if (cart.getQuantity() < 1) {
            return false;
        }

        // 해당 cartCode의 장바구니 항목을 찾음
        CartTbl existingCart = cRepo.findByCartCode(cart.getCartCode());
        if (existingCart != null) {
            // 수량 업데이트
            existingCart.setQuantity(cart.getQuantity());
            cRepo.save(existingCart);  // 변경된 수량을 DB에 저장
            return true;
        } else {
            return false;
        }
    }

    public void resetCartQuantity(String cnid) {
        List<CartTbl> cartItems = cRepo.findByCnid(cnid);  // 사용자의 장바구니 항목 가져오기

        for (CartTbl cartItem : cartItems) {
            cartItem.setQuantity(1);  // 수량을 1로 초기화
            cRepo.save(cartItem);     // 장바구니 항목 업데이트
        }
    }


//    public String getStoreCart(String cnid, long bpnum, int bpwarestock, int quantity) {
//        log.info("{} : {} ",quantity,bpwarestock);
//        if (quantity > bpwarestock) {
//            return "상품 수량이 부족합니다.";
//        }
//
//        // 장바구니에서 해당 상품이 이미 있는지 확인
//        CartTbl existingCartItem = cRepo.findByCnidAndUsedCode(cnid, bpnum);
//        if (existingCartItem != null) {
//            // 이미 장바구니에 해당 상품이 존재하는 경우
//            return "이미 장바구니에 해당 상품이 있습니다.";
//        }
//
//        // 장바구니에 상품 추가
//        CartTbl cartusedItem = new CartTbl();
//        cartusedItem.setQuantity(quantity);
//        cartusedItem.setCnid(cnid);
//        cartusedItem.setBpnum(bpnum);
//        cRepo.save(cartusedItem);
//
//        return "ok"; // 성공적으로 추가
//    }
}
