package com.testing.demo.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.actuate.autoconfigure.metrics.MetricsProperties.System;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.testing.demo.demo.model.UserCase;
import com.testing.demo.demo.repository.MyDataRepository;

@Controller
public class PageController {
    private static final Logger logger = LoggerFactory.getLogger(PageController.class);
    @Autowired
    private MyDataRepository myDataRepository;
    @GetMapping("/form")
    public ModelAndView showForm() {
        return new ModelAndView("formPage");
    }

    @PostMapping("/test/form")
    public ModelAndView testForm(@RequestParam("text") String text, @RequestParam("text2") String text2){
        // 查詢用戶是否存在
        UserCase  existingUserCase = myDataRepository.findByUserAccount(text);
        if (existingUserCase != null && text != null && text2 != null) {
            logger.info("Existing UserCase: {}", existingUserCase.getUserAccount());
        }else{
            // 找不到再新增
            UserCase user_case = new UserCase();
            user_case.setUserAccount(text);
            user_case.setUserPassword(text2);
            myDataRepository.save(user_case);
        }

        // 創建一個 Map 來存儲表單數據
        Map<String, String> data = new HashMap<>();
        // 將表單提交的文本數據存入 Map 中
        data.put("text", text);
        data.put("text2", text2);
        data.put("test", test);
        // 通過 ModelAndView 綁定數據到視圖中並返回視圖名稱 "formPage"
        return new ModelAndView("formPage", data);
    }

    @Value("${test}")
    private String test;
    @RequestMapping("hello")
    public String sayHi() {
        return "Hi";
    }
}
