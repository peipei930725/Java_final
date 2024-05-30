package com.testing.demo.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class PageController {

    private static final Logger logger = LoggerFactory.getLogger(PageController.class);

    @PostMapping("/test/form")
    public ModelAndView testForm(@RequestParam("text") String text) {
        // 創建一個 Map 來存儲表單數據
        Map<String, String> data = new HashMap<>();
        // 將表單提交的文本數據存入 Map 中
        data.put("text", text);
        // 通過 ModelAndView 綁定數據到視圖中並返回視圖名稱 "form"
        return new ModelAndView("form", data);
    }
    


    // @GetMapping("/")   //當訪問跟目錄(/)時，會調用Home()
    // public String home() {
    //     logger.info("Home page accessed");
    //     return "Home"; // 確保在模板目錄中有一個名為Home的視圖
    // }
}
