package com.testing.demo.demo.controller;

import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.testing.demo.demo.model.RegisterRequest;
import com.testing.demo.demo.model.UserCase;
import com.testing.demo.demo.repository.MyDataRepository;

<<<<<<< HEAD

@CrossOrigin(origins = "http://localhost:5173")
=======
>>>>>>> 7a8f8c0e6c075ef891702431cb52668bfa58a304
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
<<<<<<< HEAD
    public ResponseEntity<Map<String, Object>> register(@RequestBody RegisterRequest RegisterRequest) {
=======
    public String register(@RequestBody RegisterRequest registerRequest) {
>>>>>>> 7a8f8c0e6c075ef891702431cb52668bfa58a304
        // 打印接收到的账户和密码
        System.out.println("Received name: " + registerRequest.getFirstName()+" "+registerRequest.getLastName());
        System.out.println("Received account: " + registerRequest.getAccount());
        System.out.println("Received password: " + registerRequest.getPasswd());

<<<<<<< HEAD
        Map<String, Object> response = new HashMap<>();
            

        UserCase  existingUserCase = myDataRepository.findByUserAccount(RegisterRequest.getAccount());
=======
        UserCase  existingUserCase = myDataRepository.findByUserAccount(registerRequest.getAccount());
>>>>>>> 7a8f8c0e6c075ef891702431cb52668bfa58a304
        if (existingUserCase != null ) {
            System.out.println("Account is exist" );
            response.put("success", false);
            return ResponseEntity.ok(response);
        }else{
            //新增用戶
            String hashedPassword = sha256(registerRequest.getPasswd());
            UserCase user_case = new UserCase();
            user_case.setFirstName(registerRequest.getFirstName());
            user_case.setLastName(registerRequest.getLastName());
            user_case.setUserAccount(registerRequest.getAccount());
            user_case.setUserPassword(hashedPassword);
            myDataRepository.save(user_case);
<<<<<<< HEAD

            response.put("success", true);
            return ResponseEntity.ok(response);
=======
            return "Register successful for account: " + registerRequest.getAccount();
>>>>>>> 7a8f8c0e6c075ef891702431cb52668bfa58a304
        }
    }
    

    // @PostMapping("/register")
    // public String register(@RequestBody RegisterRequest registerRequest) {
    //     // 打印接收到的账户和密码
    //     System.out.println("Received name: " + registerRequest.getFirstName()+" "+registerRequest.getLastName());
    //     System.out.println("Received account: " + registerRequest.getAccount());
    //     System.out.println("Received password: " + registerRequest.getPasswd());

    //     UserCase  existingUserCase = myDataRepository.findByUserAccount(registerRequest.getAccount());
    //     if (existingUserCase != null ) {
    //         System.out.println("Account is exist" );
    //         return "Login unsuccessful for account: Account is not exist";
    //     }else{
    //         //新增用戶
    //         String hashedPassword = sha256(registerRequest.getPasswd());
    //         UserCase user_case = new UserCase();
    //         user_case.setFirstName(registerRequest.getFirstName());
    //         user_case.setLastName(registerRequest.getLastName());
    //         user_case.setUserAccount(registerRequest.getAccount());
    //         user_case.setUserPassword(hashedPassword);
    //         myDataRepository.save(user_case);
    //         return "Register successful for account: " + registerRequest.getAccount();
    //     }
    // }


    
}
