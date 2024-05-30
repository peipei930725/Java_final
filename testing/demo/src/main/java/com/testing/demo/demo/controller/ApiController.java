package com.testing.demo.demo.controller;

import java.util.HashMap;  // 導入 StudentDto 類
import java.util.Map;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.testing.demo.demo.dto.StudentDto;

@RestController
@RequestMapping(path = "/api")
public class ApiController {

    @PostMapping("/test/{classRoom}")
    public Map<String, Object> testApi(
            @RequestBody StudentDto student, // 解析請求主體中的 JSON 數據
            @PathVariable("classRoom") String classRoom, // 解析 URL 中的路徑參數
            @RequestParam String teacherName) { // 解析查詢字符串中的參數

        // 建立一個 Map 來存儲回應數據
        Map<String, Object> responseData = new HashMap<>();
        responseData.put("teacherName", teacherName);
        responseData.put("classRoom", classRoom);
        responseData.put("student", student);

        // 返回這個 Map 作為 JSON 回應
        return responseData;
    }
}

