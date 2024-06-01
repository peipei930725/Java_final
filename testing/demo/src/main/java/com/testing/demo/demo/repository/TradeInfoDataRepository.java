package com.testing.demo.demo.repository;


import org.springframework.data.mongodb.repository.MongoRepository;

import com.testing.demo.demo.model.TradeCase;


public interface TradeInfoDataRepository extends MongoRepository<TradeCase, String> {
}