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

import com.testing.demo.demo.request.TradeRequest;
import com.testing.demo.demo.repository.GroupRepository;
import com.testing.demo.demo.dto.StudentDto;
import com.testing.demo.demo.request.RegisterRequest;
import com.testing.demo.demo.request.GroupRequest;
import com.testing.demo.demo.model.GroupCase;
import com.testing.demo.demo.model.TradeCase;
import com.testing.demo.demo.repository.TradeInfoDataRepository;


@RestController
@RequestMapping(path = "/api")
public class ApiController {
    @Autowired
    private GroupRepository GroupRepository;

    @Autowired
    private TradeInfoDataRepository tradeInfoDataRepository;

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
            response.put("success", "true");
            return ResponseEntity.ok(response);
        }        
    }
    
    @PostMapping("/transfer")
    public ResponseEntity<Map<String, String>> transfer(@RequestBody TradeRequest tradeRequest) {
        Map<String, String> response = new HashMap<>();
        TradeCase existedTradeCase = tradeInfoDataRepository.findByTransferName(tradeRequest.getTransferName());
        if (existedTradeCase != null) {
            response.put("message", "Transfer name is already exist");
            return ResponseEntity.badRequest().body(response);
        }else{
            TradeCase tradeCase = new TradeCase();
            tradeCase.setPeopleCount(tradeRequest.getPeopleCount());
            tradeCase.setTradeAmount(tradeRequest.getTradeAmount());
            tradeCase.setTransferName(tradeRequest.getTransferName());
            tradeInfoDataRepository.save(tradeCase);
            response.put("message", "Trade added successfully");
            response.put("success", "true");
            return ResponseEntity.ok(response);
        }
    }
}

