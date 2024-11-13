package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.BproductTbl;
import org.hibernate.annotations.processing.SQL;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import com.icia.ggdserver.entity.OrderDetailTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

public interface OrderDetailRepository extends CrudRepository<OrderDetailTbl, Long> {

//    @Query(value = "SELECT *\n" +
//            "FROM order_detail_tbl\n" +
//            "WHERE 1 = 1\n" +
//            "  AND (\n" +
//            "    product_name LIKE CONCAT('%', :searchKeyword, '%')\n" +
//            "    OR product_code LIKE CONCAT('%', :searchKeyword, '%')\n" +
//            "  )\n" +
//            "  AND (:bid IS NULL OR seller_id = :bid)" ,nativeQuery = true)
//    Page<OrderDetailTbl> getListFilterSearch(Integer pageNum, String searchKeyword, String bid);

    //상품코드 동일한 건들 수를 세서 주문완료 건수로 출력할 예정

    @Query (
            value = "select count(*) from order_detail_tbl as o inner od as b on o.product_code = b.bpnum = :code",
            nativeQuery = true)
    long totalcnt(@PathVariable("code") long code);
}









