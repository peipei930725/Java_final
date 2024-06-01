package com.testing.demo.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "UserCase")
public class UserCase {
    @Id
    private String id;

    private String userAccount;


    private String userPassword;


    private String Username;


    // getters
    public String getId() {
        return id;
    }

    public String getUserAccount() {
        return userAccount;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public String getUser_name() {
        return Username;
    }

    // setters
    public void setId(String id) {
        this.id = id;
    }

    public void setUserAccount(String userAccount) {
        this.userAccount = userAccount;
    }

    public void setUserPassword(String userPassword) {
        this.userPassword = userPassword;
    }

    public void setUsername(String Username) {
        this.Username = Username;
    }


}