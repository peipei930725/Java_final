package com.testing.demo.demo.controller;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.testing.demo.demo.model.RegisterRequest;
import com.testing.demo.demo.model.UserCase;
import com.testing.demo.demo.repository.MyDataRepository;


@RestController
@RequestMapping("/api")
public class RegisterController {
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


    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest RegisterRequest) {
        // 打印接收到的账户和密码
        System.out.println("Received name: " + RegisterRequest.getFirstName()+" "+RegisterRequest.getLastName());
        System.out.println("Received account: " + RegisterRequest.getAccount());
        System.out.println("Received password: " + RegisterRequest.getPasswd());

        UserCase  existingUserCase = myDataRepository.findByUserAccount(RegisterRequest.getAccount());
        if (existingUserCase != null ) {
            System.out.println("Account is exist" );
            return "Login unsuccessful for account: Account is not exist";
        }else{
            //新增用戶
            String hashedPassword = sha256(RegisterRequest.getPasswd());
            UserCase user_case = new UserCase();
            user_case.setFirstName(RegisterRequest.getFirstName());
            user_case.setLastName(RegisterRequest.getLastName());
            user_case.setUserAccount(RegisterRequest.getAccount());
            user_case.setUserPassword(hashedPassword);
            myDataRepository.save(user_case);
            return "Register successful for account: " + RegisterRequest.getAccount();
        }
    }
}
