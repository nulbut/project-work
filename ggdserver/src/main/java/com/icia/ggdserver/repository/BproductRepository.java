package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.BproductTbl;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BproductRepository extends CrudRepository<BproductTbl,Long> {

    Page<BproductTbl> findByBpnumGreaterThan(long bpnum, Pageable pageable);

    Page<BproductTbl> findByBpnumGreaterThanAndBsellerId(long bpnum, String bsellerId, Pageable pageable);

    @Modifying
    @Query(value = "delete from BproductTbl b where b.bpnum in :ids")
    void deleteAllByIds(@Param("ids") List<Long> ids);

    BproductTbl findByBpnum(long productCode);




    //품절개수 세기
    long countByBcondition(String bcondition);


    //주문건수를 bpwarstockdeduct에 담기
    @Modifying
    @Transactional
    @Query("UPDATE BproductTbl b SET b.bpwarstockdeduct = :newValue WHERE b.bpnum = :bpnum")
    void updateNewColumnFromAnotherTable(@Param("bpnum") Long bpnum, @Param("newValue") int newValue);




}
