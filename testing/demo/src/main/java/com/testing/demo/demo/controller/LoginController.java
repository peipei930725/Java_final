package com.testing.demo.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.testing.demo.demo.model.LoginRequest;
import com.testing.demo.demo.model.UserCase;
import com.testing.demo.demo.repository.MyDataRepository;


@RestController
@RequestMapping("/api")
public class LoginController {
    @Autowired
    private MyDataRepository myDataRepository;
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
            if (existingUserCase.getUserPassword().equals(loginRequest.getPasswd())) {
                System.out.println("Password is correct" );
                return "Login successful for account: " + loginRequest.getAccount();
            }else{
                System.out.println("Password is incorrect" );
                return "Login unsuccessful for account: Password is incorrect";
            }

        }
    }
}
