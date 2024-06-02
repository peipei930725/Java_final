package com.testing.demo.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "TradeCase")
public class TradeCase {
    @Id
    private String tradeId;
    private String peopleCount;
    private String transferName;
    private String tradeAmount;

    // getters
    public String getTradeId() {
        return tradeId;
    }

    public String getPeopleCount() {
        return peopleCount;
    }

    public String getTransferName() {
        return transferName;
    }

    public String getTradeAmount() {
        return tradeAmount;
    }

    // setters

    public void setTradeId(String tradeId) {
        this.tradeId = tradeId;
    }

    public void setPeopleCount(String peopleCount) {
        this.peopleCount = peopleCount;
    }

    public void setTransferName(String transferName) {
        this.transferName = transferName;
    }

    public void setTradeAmount(String tradeAmount) {
        this.tradeAmount = tradeAmount;
    }


}