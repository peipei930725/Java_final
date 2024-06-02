package com.testing.demo.demo.request;

public class TradeRequest {
    private String tradeId;
    private int peopleCount;
    private String transferName;
    private int tradeAmount;

    // Getters and Setters
    public String getTradeId() {
        return tradeId;
    }

    public void setTradeId(String tradeId) {
        this.tradeId = tradeId;
    }

    public int getPeopleCount() {
        return peopleCount;
    }

    public void setPeopleCount(String peopleCount) {

        this.peopleCount = Integer.parseInt(peopleCount);
    }

    public int getTradeAmount() {
        return tradeAmount;
    }

    public void setTradeAmount(String tradeAmount) {
        this.tradeAmount = Integer.parseInt(tradeAmount);
    }

    public String getTransferName() {
        return transferName;
    }

    public void setTransferName(String transferName) {
        this.transferName = transferName;
    }
    
    
}
