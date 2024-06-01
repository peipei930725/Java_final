package com.testing.demo.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.testing.demo.demo.model.Usercase;
import com.testing.demo.demo.repository.MyDataRepository;
@RestController
public class MyDataController {
    @Autowired
    private MyDataRepository myDataRepository;

    @PostMapping("/saveData")
    public Usercase saveData(@RequestBody Usercase myData) {
        return myDataRepository.save(myData);
    }
}