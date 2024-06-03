package com.testing.demo.demo.model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "TradeCase")
public class TradeCase {
    @Id
    private String transferId;
    private Integer peopleCount;
    private String transferName;
    private Integer tradeAmount;
    private ArrayList<String> userList = new ArrayList<String>();
    
    // getters
    public String getTransferId() {
        return transferId;
    }

    public Integer getPeopleCount() {
        return peopleCount;
    }

    public String getTransferName() {
        return transferName;
    }

    public Integer getTradeAmount() {
        return tradeAmount;
    }

    public ArrayList<String> getUserList() {
        return userList;
    }

    // setters

    public void setTransferId(String transferId) {
        this.transferId = transferId;
    }

    public void setPeopleCount(Integer peopleCount) {
        this.peopleCount = peopleCount;
    }

    public void setTransferName(String transferName) {
        this.transferName = transferName;
    }

    public void setTradeAmount(Integer tradeAmount) { 
        this.tradeAmount = tradeAmount;
    }


    public void addUserList(String userId) {
        this.userList.add(userId);
    }

}