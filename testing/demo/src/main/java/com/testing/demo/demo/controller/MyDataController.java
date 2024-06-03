package com.testing.demo.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.testing.demo.demo.model.UserCase;
import com.testing.demo.demo.repository.MyDataRepository;
@RestController
public class MyDataController {
    @Autowired
    private MyDataRepository myDataRepository;

    @PostMapping("/saveData")
    public UserCase saveData(@RequestBody UserCase myData) {
        return myDataRepository.save(myData);
    }
}