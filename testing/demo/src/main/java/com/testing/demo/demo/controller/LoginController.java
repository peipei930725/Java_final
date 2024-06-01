package com.testing.demo.demo.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.testing.demo.demo.model.LoginRequest;

@RestController
@RequestMapping("/api")
public class LoginController {

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest loginRequest) {
        // 打印接收到的账户和密码
        System.out.println("Received account: " + loginRequest.getAccount());
        System.out.println("Received password: " + loginRequest.getPasswd());

        // 您可以在这里添加对账户和密码的验证逻辑
        // ...

        // 返回响应
        return "Login successful for account: " + loginRequest.getAccount();
    }
}
