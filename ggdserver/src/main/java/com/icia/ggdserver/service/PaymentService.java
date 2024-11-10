package com.icia.ggdserver.service;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.io.InputStream;
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

    public JSONObject parseRequestBody(String jsonBody) {
        try {
           JSONObject requestData = (JSONObject) parser.parse(jsonBody);
           return requestData;
        } catch (ParseException e) {
            logger.error("Failed to parse JSON body", e);
            throw new RuntimeException("Invalid JSON format", e);
        }
    }

    public ResponseEntity<JSONObject> confirmPayment(String paymentKey, String orderId, String amount){
        try{
            //요청 JSON 객체 구성
            JSONObject requestObj = new JSONObject();
            requestObj.put("orderId", orderId);
            requestObj.put("amount", amount);
            requestObj.put("paymentKey", paymentKey);

            // Authorization 헤더 설정
            String authorizations = "Basic " + Base64.getEncoder()
                    .encodeToString((widgetSecretKey + ":").getBytes(StandardCharsets.UTF_8));

            // 결제 확인 API 호출
            URL url = new URL("https://api.tosspayments.com/v1/payments/confirm");
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestProperty("Authorization", authorizations);
            connection.setRequestProperty("Content-Type", "application/json");
            connection.setRequestMethod("POST");
            connection.setDoOutput(true);

            try (OutputStream outputStream = connection.getOutputStream()){
                outputStream.write(requestObj.toString().getBytes(StandardCharsets.UTF_8));
            }
            int responseCode = connection.getResponseCode();
            InputStream responseStream = responseCode == HttpStatus.OK.value()
                    ? connection.getInputStream()
                    : connection.getErrorStream();

            // 응답 JSON 파싱
            try (Reader reader = new InputStreamReader(responseStream, StandardCharsets.UTF_8)) {
                JSONObject responseJson = (JSONObject) parser.parse(reader);
                return ResponseEntity.status(responseCode).body(responseJson);
        }
    } catch (Exception e) {
            logger.error("Payment confirmation failed", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}