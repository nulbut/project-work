package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.ProductFileTbl;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ProductRegistrationRepository extends CrudRepository<ProductFileTbl, Long> {

    List<ProductFileTbl> findByproductFileNum(long productCode);

    void deleteByproductFileNum(long productCode);
}
