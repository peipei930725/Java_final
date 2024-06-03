package com.testing.demo.demo.request;

public class AddTransferRequest {
    private String transferId;
    private String account;
    // Getters and Setters
    public String getAccount() {
        return account;
    }
    //set
    public void setTransferId(String transferId) {
        this.transferId = transferId;
    }

    //get   
    public String getTransferId() {
        return transferId;
    }
}
