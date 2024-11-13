package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.BproductTbl;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
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


    //창고재고 값 차감 시키기
    public interface BproductTblRepository extends JpaRepository<BproductTbl, Long> {
        BproductTbl findByBpnum(long bpnum);
    }



    //품절개수 세기
    long countByBcondition(String bcondition);



}
