package com.icia.ggdserver.service;

import com.icia.ggdserver.dto.OrderInfoDto;
import com.icia.ggdserver.dto.OrderRequestDto;
import com.icia.ggdserver.dto.OrderWithDetailsDto;
import com.icia.ggdserver.entity.OrderDetailTbl;
import com.icia.ggdserver.entity.OrderTbl;
import com.icia.ggdserver.repository.OrderDetailRepository;
import com.icia.ggdserver.repository.OrderRepository;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
@Service
@Slf4j
public class PaymentService {
    @Autowired
    private OrderRepository orderRepo;

    @Autowired
    private OrderDetailRepository orderDetailRepo;

    private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);
    private final JSONParser parser = new JSONParser();
    private final String widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

    public JSONObject confirmPayment(String jsonBody) throws Exception {
        JSONObject requestData = parseRequestData(jsonBody);

        String paymentKey = (String) requestData.get("paymentKey");
        String orderId = (String) requestData.get("orderId");
        String amount = (String) requestData.get("amount");

        JSONObject requestJson = new JSONObject();
        requestJson.put("orderId", orderId);
        requestJson.put("amount", amount);
        requestJson.put("paymentKey", paymentKey);

        String authorizations = createAuthorizationHeader(widgetSecretKey);

        URL url = new URL("https://api.tosspayments.com/v1/payments/confirm");
        HttpURLConnection connection = (HttpURLConnection) url.openConnection();
        connection.setRequestProperty("Authorization", authorizations);
        connection.setRequestProperty("Content-Type", "application/json");
        connection.setRequestMethod("POST");
        connection.setDoOutput(true);

        try (OutputStream outputStream = connection.getOutputStream()) {
            outputStream.write(requestJson.toString().getBytes(StandardCharsets.UTF_8));
        }

        int responseCode = connection.getResponseCode();
        boolean isSuccess = responseCode == 200;

        try (InputStream responseStream = isSuccess ? connection.getInputStream() : connection.getErrorStream();
             Reader reader = new InputStreamReader(responseStream, StandardCharsets.UTF_8)) {
            return (JSONObject) parser.parse(reader);
        }
    }

    private JSONObject parseRequestData(String jsonBody) {
        try {
            return (JSONObject) parser.parse(jsonBody);
        } catch (ParseException e) {
            throw new RuntimeException("Failed to parse request JSON", e);
        }
    }

    private String createAuthorizationHeader(String secretKey) {
        Base64.Encoder encoder = Base64.getEncoder();
        byte[] encodedBytes = encoder.encode((secretKey + ":").getBytes(StandardCharsets.UTF_8));
        return "Basic " + new String(encodedBytes);
    }

    public void saveOrderProc(OrderRequestDto order) {
        OrderTbl orderRecord = new OrderTbl();
        log.info(order.getSampeid());
        log.info(order.getUserName());
        log.info(order.getUserId());
        log.info(order.getTotalAmount()+"");
        log.info(order.getStatus());

        orderRecord.setTransactionId(order.getSampeid());
        orderRecord.setUserId(order.getUserId());
        orderRecord.setUserName(order.getUserName());
        orderRecord.setTotalAmount(order.getTotalAmount());
        orderRecord.setStatus(order.getStatus());

        orderRepo.save(orderRecord);

        orderRecord = orderRepo.findByTransactionId(order.getSampeid());
        List<OrderDetailTbl> orderDetails = getOrderDetailTbls(order, orderRecord);

        orderDetailRepo.saveAll(orderDetails);

    }

    private static List<OrderDetailTbl> getOrderDetailTbls(OrderRequestDto order, OrderTbl orderRecord) {
        List<OrderDetailTbl> orderDetails = new ArrayList<OrderDetailTbl>();
        for(OrderInfoDto oinfo : order.getBuyData()){
            OrderDetailTbl orderDetail = new OrderDetailTbl();

            orderDetail.setOrderId(orderRecord.getOrderId());
            orderDetail.setSeller_id(oinfo.getSeller_id());
            orderDetail.setProduct_where(oinfo.getProduct_where()); // 상품 위치 (매장명 등)
            orderDetail.setProduct_code(oinfo.getProduct_code());   // 상품 코드
            orderDetail.setProduct_name(oinfo.getName());                 // 상품명
            orderDetail.setQuantity(oinfo.getQuantity());         // 수량
            orderDetail.setPrice(oinfo.getPrice());               // 가격
            orderDetail.setTotal_price(oinfo.getQuantity()*oinfo.getPrice());

            orderDetails.add(orderDetail);
        }
        return orderDetails;
    }

    public void updateOrderProc(String transactionId,
                                String method,
                                String provider) {
        OrderTbl order = new OrderTbl();
        order = orderRepo.findByTransactionId(transactionId);
        order.setPaymentMethod(method);
        order.setProvider(provider);
        order.setPaymentStatus("completed");
        order.setStatus("입금완료");

        orderRepo.save(order);
    }

    public List<OrderWithDetailsDto> getStoreOrdersProc(Integer pageNum, String searchKeyword, String timeRange, String paymentMethod, String bid) {
        log.info("getBoardList()");

        List<OrderWithDetailsDto> res = orderRepo.findBySellerId(bid);

        return res;


    }


    public int getTotalAmountByPaymentStatus(String paymentStatus) {
        return orderRepo.sumTotalAmountByPaymentStatus(paymentStatus);
    }

    public long getOrderCountByPaymentStatus(String paymentStatus) {
        return orderRepo.countOrdersByPaymentStatus(paymentStatus);
    }
}

