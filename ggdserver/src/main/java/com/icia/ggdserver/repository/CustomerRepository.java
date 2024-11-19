package com.icia.ggdserver.repository;

import com.icia.ggdserver.entity.CustomerTbl;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

    @Repository
    public interface CustomerRepository extends JpaRepository<CustomerTbl, Long> {
        CustomerTbl findByCcustomerKey(String ccustomerKey);

    }
