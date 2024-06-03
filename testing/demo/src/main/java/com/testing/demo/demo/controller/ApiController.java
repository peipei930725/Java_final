package com.testing.demo.demo.controller;

import java.lang.reflect.Array;
import java.util.ArrayList;
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

import com.testing.demo.demo.request.*;
import com.testing.demo.demo.repository.*;
import com.testing.demo.demo.model.*;
import com.testing.demo.demo.dto.StudentDto;




@RestController
@RequestMapping(path = "/api")
public class ApiController {
    @Autowired
    private GroupRepository GroupRepository;

    @Autowired
    private TradeInfoDataRepository tradeInfoDataRepository;

    @PostMapping("/createGroup")
    public ResponseEntity<Map<String, String>> register(@RequestBody GroupRequest groupRequest) {
        Map<String, String> response = new HashMap<>();
        System.out.println(groupRequest.getGroupName());
        GroupCase existingGroupCase = GroupRepository.findByGroupName(groupRequest.getGroupName());
        if (groupRequest.getGroupName() == null || groupRequest.getGroupSize() == 0) {
            response.put("message", "請填入名稱或人數");
            return ResponseEntity.badRequest().body(response);
        }
        if (existingGroupCase != null) {
            response.put("message", "群組已存在");
            return ResponseEntity.badRequest().body(response);
        }else{
            GroupCase groupCase = new GroupCase();
            groupCase.setGroupName(groupRequest.getGroupName());
            groupCase.setGroupSize(groupRequest.getGroupSize());
            groupCase.addGroupMember(groupRequest.getAccount());
            GroupRepository.save(groupCase);
            response.put("message", "群組新增成功");
            response.put("success", "true");
            return ResponseEntity.ok(response);
        }        
    }
    
    @PostMapping("/transfer")
    public ResponseEntity<Map<String, String>> addTransfer(@RequestBody TradeRequest tradeRequest) {
        System.out.println(tradeRequest.getAccount());
        Map<String, String> response = new HashMap<>();
        TradeCase existedTradeCase = tradeInfoDataRepository.findByTransferName(tradeRequest.getTransferName());
        if (tradeRequest.getTransferName() == null || tradeRequest.getTradeAmount() <= 0 || tradeRequest.getPeopleCount() <= 1  ){
            response.put("message", "請填入正確資料");
            return ResponseEntity.badRequest().body(response);
        }
        if (existedTradeCase != null) {
            response.put("message", "交易名稱已存在");
            return ResponseEntity.badRequest().body(response);
        }else{
            TradeCase tradeCase = new TradeCase();
            tradeCase.setPeopleCount(tradeRequest.getPeopleCount());
            tradeCase.setTradeAmount(tradeRequest.getTradeAmount());
            tradeCase.setTransferName(tradeRequest.getTransferName());
            tradeCase.addUserList(tradeRequest.getAccount());
            tradeInfoDataRepository.save(tradeCase);
            // get tradeId
            String tradeId = tradeCase.getTransferId();
            response.put("message", "新增交易成功\n交易ID: "+tradeId);
            response.put("success", "true");
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/addTransfer")
    public ResponseEntity<Map<String, String>> transfer(@RequestBody AddTransferRequest addTransferRequest) {
        System.out.println(addTransferRequest.getAccount());
        Map<String, String> response = new HashMap<>();
        TradeCase existedTradeCase = tradeInfoDataRepository.findByTransferId(addTransferRequest.getTransferId());
        if (addTransferRequest.getTransferId() == null ){
            response.put("message", "請填入正確資料");
            return ResponseEntity.badRequest().body(response);
        }
        if (existedTradeCase == null) {
            response.put("message", "交易ID不存在");
            return ResponseEntity.badRequest().body(response);
        }else{
            TradeCase tradeCase = new TradeCase();
            tradeCase.addUserList(addTransferRequest.getAccount());
            tradeInfoDataRepository.save(tradeCase);
            // get tradeId
            String tradeId = tradeCase.getTransferId();
            response.put("message", "成功加入");
            response.put("success", "true");
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/addGroup")
    public ResponseEntity<Map<String, String>> addGroup(@RequestBody AddGroupRequest addGroupRequest) {
        Map<String, String> response = new HashMap<>();
        GroupCase existedGroupCase = GroupRepository.findByGroupName(addGroupRequest.getGroupName());
        System.out.println(existedGroupCase);
        System.out.println(addGroupRequest.getGroupName());
        if (existedGroupCase == null) {
            response.put("message", "群組不存在");
            return ResponseEntity.badRequest().body(response);
        }else{
            String groupId = existedGroupCase.getGroupId();
            System.out.println(groupId);
            int nowSize = existedGroupCase.getGroupMember().size();
            if (nowSize == existedGroupCase.getGroupSize()){
                response.put("message", "群組人數已滿");
                return ResponseEntity.badRequest().body(response);
            }else if (existedGroupCase.getGroupMember().contains(addGroupRequest.getAccount())){
                response.put("message", "已在群組中");
                return ResponseEntity.badRequest().body(response);
            }
            System.out.println(groupId);
            existedGroupCase = GroupRepository.findByGroupId(groupId);
            existedGroupCase.addGroupMember(addGroupRequest.getAccount());
            GroupRepository.save(existedGroupCase);
            response.put("message", "新增群組成員成功");
            response.put("success", "true");
            return ResponseEntity.ok(response);
        }
    }

}

