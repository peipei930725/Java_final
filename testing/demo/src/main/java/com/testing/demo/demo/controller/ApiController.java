package com.testing.demo.demo.controller;

import java.util.HashMap;  // 導入 StudentDto 類
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.testing.demo.demo.model.TradeRequest;
import com.testing.demo.demo.repository.GroupRepository;
import com.testing.demo.demo.dto.StudentDto;
import com.testing.demo.demo.model.RegisterRequest;
import com.testing.demo.demo.model.GroupRequest;
import com.testing.demo.demo.model.GroupCase;
import com.testing.demo.demo.model.TradeCase;
import com.testing.demo.demo.repository.TradeInfoDataRepository;


@RestController
@RequestMapping(path = "/api")
public class ApiController {
    @Autowired
    private GroupRepository GroupRepository;
    private TradeInfoDataRepository TradeInfoDataRepository;

    @PostMapping("/addGroup")
    public ResponseEntity<Map<String, String>> register(@RequestBody GroupRequest groupRequest) {
        Map<String, String> response = new HashMap<>();
        GroupCase existingGroupCase = GroupRepository.findByGroupName(groupRequest.getGroupName());
        if (existingGroupCase != null) {
            response.put("message", "Group name is already exist");
            return ResponseEntity.badRequest().body(response);
        }else{
            GroupCase groupCase = new GroupCase();
            groupCase.setGroupName(groupRequest.getGroupName());
            groupCase.setGroupSize(groupRequest.getGroupSize());
            GroupRepository.save(groupCase);
            response.put("message", "Group added successfully");
            return ResponseEntity.ok(response);
        }        
    }
    
    @PostMapping("/transfer")
    public ResponseEntity<Map<String, String>> transfer(@RequestBody TradeRequest tradeRequest) {
        Map<String, String> response = new HashMap<>();
        return ResponseEntity.ok(response);
    }
}

