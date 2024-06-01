package com.testing.demo.demo.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.testing.demo.demo.model.Usercase;

public interface MyDataRepository extends MongoRepository<Usercase, String> {
    
}