package com.icia.ggdserver.controller;

import com.icia.ggdserver.dto.OrderInfoDto;
import com.icia.ggdserver.dto.OrderRequestDto;
import com.icia.ggdserver.entity.IwcTbl;
import com.icia.ggdserver.service.PaymentService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.List;

@RestController
@Slf4j
public class PaymentController {
    @Autowired
    private PaymentService payServ;

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @RequestMapping(value = "/confirm")
    public ResponseEntity<JSONObject> confirmPayment(@RequestBody String jsonBody) throws Exception {

        JSONParser parser = new JSONParser();
        String orderId;
        String amount;
        String paymentKey;
        try {
            // 클라이언트에서 받은 JSON 요청 바디입니다.
            JSONObject requestData = (JSONObject) parser.parse(jsonBody);
            paymentKey = (String) requestData.get("paymentKey");
            orderId = (String) requestData.get("orderId");
            amount = (String) requestData.get("amount");
        } catch (ParseException e) {
            throw new RuntimeException(e);
        };
        JSONObject obj = new JSONObject();
        obj.put("orderId", orderId);
        obj.put("amount", amount);
        obj.put("paymentKey", paymentKey);

        // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
        // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
        String widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";
        Base64.Encoder encoder = Base64.getEncoder();
        byte[] encodedBytes = encoder.encode((widgetSecretKey + ":").getBytes(StandardCharsets.UTF_8));
        String authorizations = "Basic " + new String(encodedBytes);

        // 결제를 승인하면 결제수단에서 금액이 차감돼요.
        URL url = new URL("https://api.tosspayments.com/v1/payments/confirm");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("Authorization", authorizations);
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);

        OutputStream outputStream = connection.getOutputStream();
        outputStream.write(obj.toString().getBytes("UTF-8"));

        int code = connection.getResponseCode();
        boolean isSuccess = code == 200;

        InputStream responseStream = isSuccess ? connection.getInputStream() : connection.getErrorStream();

        // 결제 성공 및 실패 비즈니스 로직을 구현하세요.
        Reader reader = new InputStreamReader(responseStream, StandardCharsets.UTF_8);
        JSONObject jsonObject = (JSONObject) parser.parse(reader);
        responseStream.close();

        return ResponseEntity.status(code).body(jsonObject);
    }

    @RequestMapping(value = "/widsuccess", method = RequestMethod.GET)
    public String widsuccess(
            @RequestParam("paymentType") String paymentType,
            @RequestParam("orderId") String orderId,
            @RequestParam("paymentKey") String paymentKey,
            @RequestParam("amount") String amount,
            Model model) {

        log.info(paymentKey);
        // 성공 페이지에 필요한 데이터를 모델에 추가
        model.addAttribute("paymentType", paymentType);
        model.addAttribute(" orderId", orderId);
        model.addAttribute("paymentKey", paymentKey);
        model.addAttribute(" amount", amount);

        // 성공 페이지를 반환
        return "success"; // "success"는 보여줄 HTML 파일 이름입니다.
    }

    @PostMapping("saveorder")
    public String saveOrder(@RequestBody OrderRequestDto order,
                            HttpSession session){
        for(OrderInfoDto orderInfoDto : order.getBuyData()){
            log.info(orderInfoDto.toString());
        }
        log.info(order.getSampeid());
        log.info(order.getUserName());
        log.info(order.getUserId());
        log.info(order.getTotalAmount()+"");
        log.info(order.getStatus());
        payServ.saveOrderProc(order);


        return "esult";
    }

    @GetMapping("updateorder")
    public String updateOrder(@RequestParam String transactionId,

                              @RequestParam String method,
                              @RequestParam String provider){

            log.info(transactionId);


        payServ.updateOrderProc(transactionId,method,provider);


        return "esult";
    }

}
