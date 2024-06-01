package com.testing.demo.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "TradeCase")
public class TradeCase {
    @Id
    private String id;
    private String Payer_id;
    private String Payee_id;
    private String Money;

    // getters
    public String getId() {
        return id;
    }

    public String getPayer_id() {
        return Payer_id;
    }

    public String getPayee_id() {
        return Payee_id;
    }

    public String getMoney() {
        return Money;
    }


    // setters
    public void setId(String id) {
        this.id = id;
    }

    public void setPayer_id(String Payer_id) {
        this.Payer_id = Payer_id;
    }

    public void setPayee_id(String Payee_id) {
        this.Payee_id = Payee_id;
    }

    public void setMoney(String Money) {
        this.Money = Money;
    }

    
}