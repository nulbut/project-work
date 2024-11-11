package com.icia.ggdserver.service;

import com.icia.ggdserver.entity.PaymentTbl;
import com.icia.ggdserver.repository.PaymentRepository;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

@Service
public class PaymentService {

    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);
    private final JSONParser parser = new JSONParser();
    private final String widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

    @Autowired
    private PaymentRepository paymentRepository;

    public ResponseEntity<JSONObject> confirmPayment(String paymentKey, String porderId, int pamount) {
        try {
            // 결제 정보 확인 및 API 호출
            URL url = new URL("https://api.tosspayments.com/v1/payments/confirm");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            String authorization = "Basic " + Base64.getEncoder().encodeToString((widgetSecretKey + ":").getBytes(StandardCharsets.UTF_8));

            connection.setRequestProperty("Authorization", authorization);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);

            // 요청 JSON 데이터 구성
            JSONObject requestObj = new JSONObject();
            requestObj.put("orderId", porderId);
            requestObj.put("amount", pamount);
            requestObj.put("paymentKey", paymentKey);

            try (OutputStream outputStream = connection.getOutputStream()) {
                outputStream.write(requestObj.toString().getBytes(StandardCharsets.UTF_8));
            }

            // 응답 처리
            Reader reader = new InputStreamReader(connection.getInputStream(), StandardCharsets.UTF_8);
            JSONObject responseJson = (JSONObject) parser.parse(reader);

            // 결제 정보 업데이트 및 저장
            PaymentTbl payment = paymentRepository.findByPorderId(porderId);
            payment.setPstatus(responseJson.get("status").toString());
            paymentRepository.save(payment);

            return ResponseEntity.status(HttpStatus.OK).body(responseJson);

        } catch (Exception e) {
            logger.error("Payment confirmation failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}