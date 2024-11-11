// package com.icia.ggdserver.service;

// import org.json.simple.JSONObject;
// import org.json.simple.parser.JSONParser;
// import org.json.simple.parser.ParseException;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

// import java.io.InputStream;
// import java.io.InputStreamReader;
// import java.io.OutputStream;
// import java.io.Reader;
// import java.net.HttpURLConnection;
// import java.net.URL;
// import java.nio.charset.StandardCharsets;
// import java.util.Base64;

// public class PaymentService {
//     private static final Logger logger = LoggerFactory.getLogger(PaymentService.class);
//     private final JSONParser parser = new JSONParser();
//     private final String widgetSecretKey = "test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6";

//     public JSONObject confirmPayment(String jsonBody) throws Exception {
//         JSONObject requestData = parseRequestData(jsonBody);

//         String paymentKey = (String) requestData.get("paymentKey");
//         String orderId = (String) requestData.get("orderId");
//         String amount = (String) requestData.get("amount");

//         JSONObject requestJson = new JSONObject();
//         requestJson.put("orderId", orderId);
//         requestJson.put("amount", amount);
//         requestJson.put("paymentKey", paymentKey);

//         String authorizations = createAuthorizationHeader(widgetSecretKey);

//         URL url = new URL("https://api.tosspayments.com/v1/payments/confirm");
//         HttpURLConnection connection = (HttpURLConnection) url.openConnection();
//         connection.setRequestProperty("Authorization", authorizations);
//         connection.setRequestProperty("Content-Type", "application/json");
//         connection.setRequestMethod("POST");
//         connection.setDoOutput(true);

//         try (OutputStream outputStream = connection.getOutputStream()) {
//             outputStream.write(requestJson.toString().getBytes(StandardCharsets.UTF_8));
//         }

//         int responseCode = connection.getResponseCode();
//         boolean isSuccess = responseCode == 200;

//         try (InputStream responseStream = isSuccess ? connection.getInputStream() : connection.getErrorStream();
//              Reader reader = new InputStreamReader(responseStream, StandardCharsets.UTF_8)) {
//             return (JSONObject) parser.parse(reader);
//         }
//     }

//     private JSONObject parseRequestData(String jsonBody) {
//         try {
//             return (JSONObject) parser.parse(jsonBody);
//         } catch (ParseException e) {
//             throw new RuntimeException("Failed to parse request JSON", e);
//         }
//     }

//     private String createAuthorizationHeader(String secretKey) {
//         Base64.Encoder encoder = Base64.getEncoder();
//         byte[] encodedBytes = encoder.encode((secretKey + ":").getBytes(StandardCharsets.UTF_8));
//         return "Basic " + new String(encodedBytes);
//     }
// }

