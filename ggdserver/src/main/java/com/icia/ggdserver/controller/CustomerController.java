package com.icia.ggdserver.controller;

import com.icia.ggdserver.entity.CustomerTbl;
import com.icia.ggdserver.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerService customerService;

    // 모든 고객 조회
    @GetMapping
    public ResponseEntity<List<CustomerTbl>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    // 고객 키로 고객 조회
    @GetMapping("/{customerKey}")
    public ResponseEntity<CustomerTbl> getCustomerByKey(@PathVariable String customerKey) {
        return customerService.getCustomerByKey(customerKey)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    // 고객 생성
    @PostMapping
    public ResponseEntity<CustomerTbl> createCustomer(@RequestBody CustomerTbl customer) {
        CustomerTbl newCustomer = customerService.createCustomer(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(newCustomer);
    }

    // 고객 정보 업데이트
    @PutMapping("/{id}")
    public ResponseEntity<CustomerTbl> updateCustomer(@PathVariable Long id, @RequestBody CustomerTbl updatedCustomer) {
        try {
            CustomerTbl customer = customerService.updateCustomer(id, updatedCustomer);
            return ResponseEntity.ok(customer);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    // 고객 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}