package com.testing.demo.demo.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.testing.demo.demo.model.UserCase;

public interface TradeInfoDataRepository extends MongoRepository<UserCase, String> {
}