package com.testing.demo.demo.model;

public class RegisterRequest {
    private String firstName;
    private String lastName;
    private String account;
    private String passwd;

    // Getters and Setters
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getAccount() {
        return account;
    }

    public String getPasswd() {
        return passwd;
    }
    
}
