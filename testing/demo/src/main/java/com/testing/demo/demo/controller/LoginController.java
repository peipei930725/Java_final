package com.testing.demo.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.testing.demo.demo.model.LoginRequest;
import com.testing.demo.demo.model.RegisterRequest;
import com.testing.demo.demo.model.UserCase;
import com.testing.demo.demo.repository.MyDataRepository;

import java.security.MessageDigest;
import java.nio.charset.StandardCharsets;
import java.math.BigInteger;

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
    public String login(@RequestBody LoginRequest loginRequest) {
        // 打印接收到的账户和密码
        System.out.println("Received account: " + loginRequest.getAccount());
        System.out.println("Received password: " + loginRequest.getPasswd());

        // 您可以在这里添加对账户和密码的验证逻辑
        // ...
        UserCase  existingUserCase = myDataRepository.findByUserAccount(loginRequest.getAccount());
        if (existingUserCase == null ) {
            System.out.println("Account is not exist" );
            return "Login unsuccessful for account: Account is not exist";
        }else{
            //驗證登入
            String hashedPassword = sha256(loginRequest.getPasswd());
            if (existingUserCase.getUserPassword().equals(hashedPassword)) {
                System.out.println("Password is correct" );
                return "Login successful for account: " + loginRequest.getAccount();
            }else{
                System.out.println("Password is incorrect" );
                return "Login unsuccessful for account: Password is incorrect";
            }

        }
    }
}
