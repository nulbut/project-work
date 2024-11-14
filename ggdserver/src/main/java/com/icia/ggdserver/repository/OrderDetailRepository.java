package com.icia.ggdserver.repository;


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
}
