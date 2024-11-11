package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.CustomerTbl;
import com.icia.ggdserver.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerService {

    @Autowired
    private CustomerRepository customerRepository;

    // 모든 고객 조회
    public List<CustomerTbl> getAllCustomers() {
        return customerRepository.findAll();
    }

    // 고객 키로 고객 조회
    public Optional<CustomerTbl> getCustomerByKey(String customerKey) {
        return Optional.ofNullable(customerRepository.findByCcustomerKey(customerKey));
    }

    // 고객 생성
    public CustomerTbl createCustomer(CustomerTbl customer) {
        return customerRepository.save(customer);
    }

    // 고객 정보 업데이트
    public CustomerTbl updateCustomer(Long id, CustomerTbl updatedCustomer) {
        return customerRepository.findById(id).map(customer -> {
            customer.setCname(updatedCustomer.getCname());
            customer.setCemail(updatedCustomer.getCemail());
            customer.setCphonenum(updatedCustomer.getCphonenum());
            customer.setCupdatedAt(LocalDateTime.now());
            return customerRepository.save(customer);
        }).orElseThrow(() -> new RuntimeException("Customer not found with id " + id));
    }

    // 고객 삭제
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
