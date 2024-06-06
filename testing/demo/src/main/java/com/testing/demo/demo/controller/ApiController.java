package com.testing.demo.demo.controller;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;  // 導入 StudentDto 類

import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.testing.demo.demo.model.*;
import com.testing.demo.demo.repository.*;
import com.testing.demo.demo.request.*;




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
        // System.out.println(groupRequest.getGroupName());
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
        // System.out.println(tradeRequest.getAccount());
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
        // System.out.println(addTransferRequest.getTransferId());
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
        // System.out.println(existedGroupCase);
        // System.out.println(addGroupRequest.getGroupName());
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

        //test print
        // System.out.println("WaitForTransfer:");
        // System.out.println(responseName);
        // System.out.println(responseMoney);

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


        //test print
        // System.out.println("WaitForAccept:");
        // System.out.println(responseName);
        // System.out.println(responseMoney);

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

        //test print
        // System.out.println("Done:");
        // System.out.println(responseName);
        // System.out.println(responseMoney);


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
        boolean flag = true;
        for (int i = 0; i < tradeList.size(); i++) {
            int userCount = 0;
            TradeCase trade = tradeInfoDataRepository.findByTransferId(tradeList.get(i));
            responseName += trade.getTransferName() + ",";
            for (int j = 0; j < trade.getUserList().size(); j++) {
                UserCase newUser =  myDataRepository.findByUserAccount(trade.getUserList().get(j));
                Integer index = newUser.getUserTradeList().indexOf(trade.getTransferId());
                if (index == -1){
                    continue;
                }
                if (newUser.getUserStateList().get(index).equals("done")){
                    userCount++;
                    flag = false;
                }
                // else if (newUser.getUserStateList().get(index).equals("waitPay")|| newUser.getUserStateList().get(index).equals("waitAllAccept")){
                //     flag = true;
                // }
            }
            responseCount += Integer.toString(userCount) + "/" + trade.getUserList().size() + ",";
        }
        if (responseName.length() > 0){
            responseName = responseName.substring(0, responseName.length()-1);
        }
        if (responseCount.length() > 0){
            responseCount = responseCount.substring(0, responseCount.length()-1);
        }
        if (responseName.length() == 0 || flag){
            responseName = "null";
            responseCount = "null";
        }

        //test print
        // System.out.println("ToBeTransfer:");
        // System.out.println(responseName);
        // System.out.println(responseCount);





        response.put("groupName", responseName);
        response.put("count", responseCount);
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
        boolean flag = true;
        for (int i = 0; i < tradeList.size(); i++) {
            int userCount = 0;
            TradeCase trade = tradeInfoDataRepository.findByTransferId(tradeList.get(i));
            responseName += trade.getTransferName() + ",";
            for (int j = 0; j < trade.getUserList().size(); j++) {
                UserCase newUser =  myDataRepository.findByUserAccount(trade.getUserList().get(j));
                Integer index = newUser.getUserTradeList().indexOf(trade.getTransferId());
                if (index == -1){
                    continue;
                }
                if (newUser.getUserStateList().get(index).equals("waitAllAccept")|| newUser.getUserStateList().get(index).equals("waitPay")|| newUser.getUserStateList().get(index).equals("done")){
                    userCount++;
                    flag = false;
                }
                // else if (newUser.getUserStateList().get(index).equals("done")){
                // flag = true;
                // }
            }
            responseCount += Integer.toString(userCount) + "/" + trade.getUserList().size() + ",";
        }
        if (responseName.length() > 0){
            responseName = responseName.substring(0, responseName.length()-1);
        }
        if (responseCount.length() > 0){
            responseCount = responseCount.substring(0, responseCount.length()-1);
        }
        if (responseName.length() == 0 || flag){
            responseName = "null";
            responseCount = "null";
        }


        //test print
        // System.out.println("ToBeAccept:");
        // System.out.println(responseName);
        // System.out.println(responseCount);
        user =  myDataRepository.findByUserAccount(historyToBeAcceptRequest.getAccount());
        ArrayList<String> tradeList1 = user.getUserTradeList();
        for (int i = 0; i < tradeList1.size(); i++) {
            TradeCase trade = tradeInfoDataRepository.findByTransferId(tradeList1.get(i));
            int userCount = 0;
            for (int j = 0; j < trade.getUserList().size(); j++) {
                UserCase newUser =  myDataRepository.findByUserAccount(trade.getUserList().get(j));
                Integer indexIf = newUser.getUserTradeList().indexOf(trade.getTransferId());
                if (indexIf == -1){
                    continue;
                }
                if (newUser.getUserStateList().get(indexIf).equals("waitAllAccept")){
                    userCount++;
                }
                // k
            }
            if (userCount == trade.getUserList().size()){
                for (int j = 0; j < trade.getUserList().size(); j++) {
                    UserCase newUser =  myDataRepository.findByUserAccount(trade.getUserList().get(j));
                    Integer indexIf = newUser.getUserTradeList().indexOf(trade.getTransferId());
                    if (indexIf == -1){
                        continue;
                    }
                    // newUser.setUserState(indexIf, "waitPay");
                    ArrayList<String> state1 = newUser.getUserStateList();
                    state1.set(indexIf, "waitPay");
                    newUser.setUserStateList(state1);
                    myDataRepository.save(newUser);
                }
            }
        }
        response.put("groupName", responseName);
        response.put("count", responseCount);
        response.put("success", "true");
        return ResponseEntity.ok(response);
    }

    @PostMapping("/reject")
    public ResponseEntity<Map<String, String>> reject(@RequestBody requestRequest rejectRequest) {  
        Map<String, String> response = new HashMap<>();
        UserCase user =  myDataRepository.findByUserAccount(rejectRequest.getAccount());
        TradeCase trade = tradeInfoDataRepository.findByTransferName(rejectRequest.getTransferName());
        Integer index = user.getUserTradeList().indexOf(trade.getTransferId());
        if (index == -1 || user==null ){
            System.out.println("error");
            response.put("message", "error");
            return ResponseEntity.badRequest().body(response);
        }
        //remove trade
        // user.removeUserTrade(trade.getTransferId());
        ArrayList<String> del  = user.getUserTradeList();
        del.remove(trade.getTransferId());
        user.setUserTradeList(del);
        // user.removeUserState(index);
        ArrayList<String> delState = user.getUserStateList();
        delState.remove(index);
        user.setUserStateList(delState);
        // trade.removeUserList(rejectRequest.getAccount());
        ArrayList<String> delTrade = trade.getUserList();
        delTrade.remove(rejectRequest.getAccount());
        trade.setUserList(delTrade);

        tradeInfoDataRepository.save(trade);
        myDataRepository.save(user);
        
        response.put("success", "true");
        return ResponseEntity.ok(response);
    }


    // 665ef0309cf7f709c7d58df3
    @PostMapping("/accept")
    public ResponseEntity<Map<String, String>> accept(@RequestBody requestRequest acceptRequest) {
        Map<String, String> response = new HashMap<>();
        System.out.println(acceptRequest.getTransferName());
        UserCase user =  myDataRepository.findByUserAccount(acceptRequest.getAccount());
        TradeCase trade = tradeInfoDataRepository.findByTransferName(acceptRequest.getTransferName());
        Integer index = user.getUserTradeList().indexOf(trade.getTransferId());
        if (index == -1  ){
            System.out.println("error");
            response.put("message", "error");
            return ResponseEntity.badRequest().body(response);
        }
        if(user.getUserStateList().get(index).equals("waitPay")){
            // user.setUserState(index, "done");
            ArrayList<String> state = user.getUserStateList();
            state.set(index, "done");
            user.setUserStateList(state);
            myDataRepository.save(user);
        }else if(user.getUserStateList().get(index).equals("wait")){
            // user.setUserState(index, "waitAllAccept");
            ArrayList<String> state = user.getUserStateList();
            state.set(index, "waitAllAccept");
            user.setUserStateList(state);
            myDataRepository.save(user);
        }
        
        response.put("success", "true");
        return ResponseEntity.ok(response);
    }
        @PostMapping("/acceptTransfer")
        public ResponseEntity<Map<String, String>> acceptTransfer(@RequestBody requestRequest acceptTransferRequest) { 
            Map<String, String> response = new HashMap<>();
            System.out.println(acceptTransferRequest.getTransferName());
            UserCase user =  myDataRepository.findByUserAccount(acceptTransferRequest.getAccount());
            TradeCase trade = tradeInfoDataRepository.findByTransferName(acceptTransferRequest.getTransferName());
            Integer index = user.getUserTradeList().indexOf(trade.getTransferId());
            if (index == -1  ){
                System.out.println("error");
                response.put("message", "error");
                return ResponseEntity.badRequest().body(response);
            }
            if(user.getUserStateList().get(index).equals("waitPay")){
                // user.setUserState(index, "done");
                ArrayList<String> state = user.getUserStateList();
                state.set(index, "done");
                user.setUserStateList(state);
                myDataRepository.save(user);
            }
            response.put("success", "true");
            return ResponseEntity.ok(response);
        }
}

