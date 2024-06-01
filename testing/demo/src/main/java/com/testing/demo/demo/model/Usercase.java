package com.testing.demo.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "UserCase")
public class UserCase {
    @Id
    private String id;
    private String User_account;
    private String User_password;
    private String User_name;

    // getters
    public String getId() {
        return id;
    }

    public String getUser_account() {
        return User_account;
    }

    public String getUser_password() {
        return User_password;
    }

    public String getUser_name() {
        return User_name;
    }

    // setters
    public void setId(String id) {
        this.id = id;
    }

    public void setUser_account(String User_account) {
        this.User_account = User_account;
    }

    public void setUser_password(String User_password) {
        this.User_password = User_password;
    }

    public void setUser_name(String User_name) {
        this.User_name = User_name;
    }


}