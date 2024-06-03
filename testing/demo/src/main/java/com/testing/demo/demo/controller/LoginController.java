package com.testing.demo.demo.controller;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.testing.demo.demo.request.LoginRequest;
import com.testing.demo.demo.model.UserCase;
import com.testing.demo.demo.repository.MyDataRepository;
@RestController
@RequestMapping("/api")
public class LoginController {
    @Autowired
    private MyDataRepository myDataRepository;

    private String sha256(String password) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(password.getBytes(StandardCharsets.UTF_8));
            BigInteger number = new BigInteger(1, hash);
            StringBuilder hexString = new StringBuilder(number.toString(16));
            while (hexString.length() < 32) {
                hexString.insert(0, '0');
            }
            return hexString.toString();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> login(@RequestBody LoginRequest loginRequest) {
        Map<String, String> response = new HashMap<>();
        // 打印接收到的账户和密码
        System.out.println("Received account: " + loginRequest.getAccount());
        System.out.println("Received password: " + loginRequest.getPasswd());

        // 您可以在这里添加对账户和密码的验证逻辑
        // ...
        UserCase  existingUserCase = myDataRepository.findByUserAccount(loginRequest.getAccount());
        if (existingUserCase == null ) {
            response.put("message", "帳號不存在");
            response.put("success", "false");
            return ResponseEntity.badRequest().body(response);
        }else{
            //驗證登入
            String hashedPassword = sha256(loginRequest.getPasswd());
            if (existingUserCase.getUserPassword().equals(hashedPassword)) {
                response.put("message", "登入成功");
                response.put("success", "true");
                return ResponseEntity.ok().body(response);
            }else{
                System.out.println("Password is incorrect" );
                response.put("message", "密碼錯誤");
                response.put("success", "false");
                return ResponseEntity.badRequest().body(response);
            }

        }
    }
    
    @Value("${spring.data.mongodb.uri}")
    private String mongoUri;
    
    @Value("${spring.data.mongodb.database}")
    private String mongoDatabase;
    
    @PostMapping("/test")
    public List<String> testPost() {
        List<String> userAccounts = new ArrayList<>();
    
        try (MongoClient mongoClient = MongoClients.create(mongoUri)) {
            MongoDatabase database = mongoClient.getDatabase(mongoDatabase);
            MongoCollection<Document> collection = database.getCollection("UserCase");
    
            for (Document doc : collection.find()) {
                userAccounts.add(doc.getString("userAccount"));
            }
        }
    
        return userAccounts;
    }
}
