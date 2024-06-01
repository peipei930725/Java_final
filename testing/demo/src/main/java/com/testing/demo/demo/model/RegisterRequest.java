package com.testing.demo.demo.model;

public class RegisterRequest {
    private String FirstName;
    private String LastName;
    private String account;
    private String passwd;

    // Getters and Setters
    public String getFirstName() {
        return FirstName;
    }
    
    public void setFirstName(String FirstName) {
        this.FirstName = FirstName;
    }
    
    public String getLastName() {
        return LastName;
    }
    
    public void setLastName(String LastName) {
        this.LastName = LastName;
    }
    

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }
}
