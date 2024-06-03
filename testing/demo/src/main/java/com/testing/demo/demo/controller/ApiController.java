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

    @Autowired
    private MyDataRepository myDataRepository;
    
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
            //新增群組
            GroupCase groupCase = new GroupCase();
            groupCase.setGroupName(groupRequest.getGroupName());
            groupCase.setGroupSize(groupRequest.getGroupSize());
            groupCase.addGroupMember(groupRequest.getAccount());
            GroupRepository.save(groupCase);

            // 將群組加入到用戶的群組列表中
            UserCase user =  myDataRepository.findByUserAccount(groupRequest.getAccount());
            user.addUserGroupList(groupCase.getGroupId());
            myDataRepository.save(user);


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
            //新增交易
            TradeCase tradeCase = new TradeCase();
            tradeCase.setPeopleCount(tradeRequest.getPeopleCount());
            tradeCase.setTradeAmount(tradeRequest.getTradeAmount());
            tradeCase.setTransferName(tradeRequest.getTransferName());
            tradeCase.addUserList(tradeRequest.getAccount());
            tradeInfoDataRepository.save(tradeCase);
            
            // 將交易加入到用戶的交易列表中
            UserCase user =  myDataRepository.findByUserAccount(tradeRequest.getAccount());
            user.addUserTradeList(tradeCase.getTransferId());
            user.addUserStateList("wait");
            myDataRepository.save(user);


            response.put("message", "新增交易成功\n交易ID: "+tradeCase.getTransferId());
            response.put("success", "true");
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/addTransfer")
    public ResponseEntity<Map<String, String>> transfer(@RequestBody AddTransferRequest addTransferRequest) {
        System.out.println(addTransferRequest.getTransferId());
        Map<String, String> response = new HashMap<>();
        TradeCase existedTradeCase = tradeInfoDataRepository.findByTransferId(addTransferRequest.getTransferId());
        if (addTransferRequest.getTransferId() == null ){
            response.put("message", "請填入正確資料");
            return ResponseEntity.badRequest().body(response);
        }
        if (existedTradeCase == null) {
            response.put("message", "交易ID不存在");
            return ResponseEntity.badRequest().body(response);
        }else if (existedTradeCase.getUserList().contains(addTransferRequest.getAccount())){
            response.put("message", "請勿重複加入");
            return ResponseEntity.badRequest().body(response);
        }else if (existedTradeCase.getUserList().size() == existedTradeCase.getPeopleCount()){
            response.put("message", "人數已滿");
            return ResponseEntity.badRequest().body(response);
        }else{
            existedTradeCase.addUserList(addTransferRequest.getAccount());
            tradeInfoDataRepository.save(existedTradeCase);
            // get tradeId

            UserCase user =  myDataRepository.findByUserAccount(addTransferRequest.getAccount());
            user.addUserTradeList(existedTradeCase.getTransferId());
            user.addUserStateList("wait");
            myDataRepository.save(user);

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


            UserCase user =  myDataRepository.findByUserAccount(addGroupRequest.getAccount());
            user.addUserGroupList(existedGroupCase.getGroupId());
            myDataRepository.save(user);

            existedGroupCase = GroupRepository.findByGroupId(groupId);
            existedGroupCase.addGroupMember(addGroupRequest.getAccount());
            GroupRepository.save(existedGroupCase);
            response.put("message", "新增群組成員成功");
            response.put("success", "true");
            return ResponseEntity.ok(response);
        }
    }

    @PostMapping("/transfer/waitForTransfer")
    public ResponseEntity<Map<String, String>> waitForTransfer(@RequestBody WaitForTransferRequest waitForTransferRequest) {
        System.out.println(waitForTransferRequest.getAccount());
        UserCase user =  myDataRepository.findByUserAccount(waitForTransferRequest.getAccount());
        Map<String, String> response = new HashMap<>();
        ArrayList<String> tradeList = user.getUserTradeList();
        ArrayList<String> stateList = user.getUserStateList();
        String responseName = "";
        String responseMoney = "";
        // for i in range tradeList
        for (int i = 0; i < tradeList.size(); i++) {
            if(stateList.get(i).equals("waitPay")){
                TradeCase trade = tradeInfoDataRepository.findByTransferId(tradeList.get(i));
                responseName += trade.getTransferName() + ",";
                responseMoney += trade.getTradeAmount() + ",";
            }
        }
        // responseName-1
        if (responseName.length() > 0){
            responseName = responseName.substring(0, responseName.length()-1);
        }
        if (responseMoney.length() > 0){
            responseMoney = responseMoney.substring(0, responseMoney.length()-1);
        }
        if (responseName.length() == 0){
            responseName = "null";
            responseMoney = "null";
        }
        System.out.println(responseName);
        System.out.println(responseMoney);
        response.put("groupName", responseName);
        response.put("money", responseMoney);
        response.put("success", "true");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/transfer/waitForAccept")
    public ResponseEntity<Map<String, String>> waitForAccept(@RequestBody WaitForAcceptRequest waitForAcceptRequest) {
        System.out.println(waitForAcceptRequest.getAccount());
        UserCase user =  myDataRepository.findByUserAccount(waitForAcceptRequest.getAccount());
        Map<String, String> response = new HashMap<>();
        ArrayList<String> tradeList = user.getUserTradeList();
        ArrayList<String> stateList = user.getUserStateList();
        String responseName = "";
        String responseMoney = "";
        // for i in range tradeList
        for (int i = 0; i < tradeList.size(); i++) {
            if(stateList.get(i).equals("wait")){
                TradeCase trade = tradeInfoDataRepository.findByTransferId(tradeList.get(i));
                responseName += trade.getTransferName() + ",";
                responseMoney += trade.getTradeAmount() + ",";
            }
        }
        // responseName-1
        if (responseName.length() > 0){
            responseName = responseName.substring(0, responseName.length()-1);
        }
        if (responseMoney.length() > 0){
            responseMoney = responseMoney.substring(0, responseMoney.length()-1);
        }
        if (responseName.length() == 0){
            responseName = "null";
            responseMoney = "null";
        }
        System.out.println(responseName);
        System.out.println(responseMoney);
        response.put("groupName", responseName);
        response.put("money", responseMoney);
        response.put("success", "true");
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/history/done")
    public ResponseEntity<Map<String, String>> historyDone(@RequestBody HistoryDoneRequest historyDoneRequest) {
        System.out.println(historyDoneRequest.getAccount());
        UserCase user =  myDataRepository.findByUserAccount(historyDoneRequest.getAccount());
        Map<String, String> response = new HashMap<>();
        ArrayList<String> tradeList = user.getUserTradeList();
        ArrayList<String> stateList = user.getUserStateList();
        String responseName = "";
        String responseMoney = "";
        for (int i = 0; i < tradeList.size(); i++) {
            if(stateList.get(i).equals("done")){
                TradeCase trade = tradeInfoDataRepository.findByTransferId(tradeList.get(i));
                responseName += trade.getTransferName() + ",";
                responseMoney += trade.getTradeAmount() + ",";
            }
        }
        // responseName-1
        if (responseName.length() > 0){
            responseName = responseName.substring(0, responseName.length()-1);
        }
        if (responseMoney.length() > 0){
            responseMoney = responseMoney.substring(0, responseMoney.length()-1);
        }
        if (responseName.length() == 0){
            responseName = "null";
            responseMoney = "null";
        }
        response.put("groupName", responseName);
        response.put("money", responseMoney);
        response.put("success", "true");
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/history/toBeTransfer")
    public ResponseEntity<Map<String, String>> historyToBeTransfer(@RequestBody HistoryToBeTransferredRequest historyToBeTransferRequest) {
        System.out.println(historyToBeTransferRequest.getAccount());
        UserCase user =  myDataRepository.findByUserAccount(historyToBeTransferRequest.getAccount());
        Map<String, String> response = new HashMap<>();
        ArrayList<String> tradeList = user.getUserTradeList();
        ArrayList<String> stateList = user.getUserStateList();
        String responseName = "";
        String responseCount = "";
        for (int i = 0; i < tradeList.size(); i++) {
            int userCount = 0;
            TradeCase trade = tradeInfoDataRepository.findByTransferId(tradeList.get(i));
            responseName += trade.getTransferName() + ",";
            for (int j = 0; j < trade.getUserList().size(); j++) {
                UserCase newUser =  myDataRepository.findByUserAccount(trade.getUserList().get(j));
                Integer index = newUser.getUserTradeList().indexOf(trade.getTransferName());
                if (index == -1){
                    continue;
                }
                if (newUser.getUserStateList().get(index).equals("waitPay")){
                    userCount++;
                }
            }
            responseCount += Integer.toString(userCount) + "/" + trade.getUserList().size() + ",";
        }
        if (responseName.length() == 0){
            responseName = "null";
            responseCount = "null";
        }
        response.put("groupName", responseName);
        response.put("Count", responseCount);
        response.put("success", "true");
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/history/toBeAccept")
    public ResponseEntity<Map<String, String>> historyToBeAccept(@RequestBody HistoryToBeAcceptedRequest historyToBeAcceptRequest) {
        System.out.println(historyToBeAcceptRequest.getAccount());
        UserCase user =  myDataRepository.findByUserAccount(historyToBeAcceptRequest.getAccount());
        Map<String, String> response = new HashMap<>();
        ArrayList<String> tradeList = user.getUserTradeList();
        ArrayList<String> stateList = user.getUserStateList();
        String responseName = "";
        String responseCount = "";

        for (int i = 0; i < tradeList.size(); i++) {
            int userCount = 0;
            TradeCase trade = tradeInfoDataRepository.findByTransferId(tradeList.get(i));
            responseName += trade.getTransferName() + ",";
            for (int j = 0; j < trade.getUserList().size(); j++) {
                UserCase newUser =  myDataRepository.findByUserAccount(trade.getUserList().get(j));
                Integer index = newUser.getUserTradeList().indexOf(trade.getTransferName());
                if (index == -1){
                    continue;
                }
                if (newUser.getUserStateList().get(index).equals("wait")){
                    userCount++;
                }
            }
            responseCount += Integer.toString(userCount) + "/" + trade.getUserList().size() + ",";
        }

        if (responseName.length() == 0){
            responseName = "null";
            responseCount = "null";
        }
        response.put("groupName", responseName);
        response.put("Count", responseCount);
        response.put("success", "true");
        return ResponseEntity.ok(response);
    }
    
}

