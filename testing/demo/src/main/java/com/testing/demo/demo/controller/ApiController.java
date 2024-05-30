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
            @RequestBody StudentDto student,
            @PathVariable("classRoom") String classRoom,
            @RequestParam String teacherName) {

        Map<String, Object> responseData = new HashMap<>();
        responseData.put("teacherName", teacherName);
        responseData.put("classRoom", classRoom);
        responseData.put("student", student);

        return responseData;
    }
}
