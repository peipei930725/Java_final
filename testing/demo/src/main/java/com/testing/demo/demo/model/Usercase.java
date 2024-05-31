package com.testing.demo.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "myCollection")
public class Usercase {
    @Id
    private String id;
    private String text;
    private String text2;

    // getters
    public String getId() {
        return id;
    }

    public String getText() {
        return text;
    }

    public String getText2() {
        return text2;
    }

    // setters
    public void setId(String id) {
        this.id = id;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setText2(String text2) {
        this.text2 = text2;
    }
}