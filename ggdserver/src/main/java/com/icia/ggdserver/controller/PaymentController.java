package com.icia.ggdserver.controller;

import com.icia.ggdserver.service.PaymentService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/confirm")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping("/widget")
    public ResponseEntity<JSONObject> confirmPayment(
            @RequestParam String porderId,
            @RequestParam String paymentKey,
            @RequestParam int pamount) {
        return paymentService.confirmPayment(paymentKey, porderId, pamount);
    }
}