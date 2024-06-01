package com.testing.demo.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "UserCase")
public class UserCase {
    @Id
    private String id;
    private String name;

    // getters
    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }


    // setters
    public void setId(String id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

}