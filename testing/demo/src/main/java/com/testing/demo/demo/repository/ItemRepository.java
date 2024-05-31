package com.testing.demo.demo.repository;

import com.testing.demo.demo.model.GroceryItem;  
import org.springframework.data.mongodb.repository.MongoRepository;  
import org.springframework.data.mongodb.repository.Query; // Import the Query class
import java.util.List; // Import the List class

public interface ItemRepository extends MongoRepository<GroceryItem, String> {
    
    @Query("{name:'?0'}")
    GroceryItem findItemByName(String name);
    
    @Query(value="{category:'?0'}", fields="{'name' : 1, 'quantity' : 1}")
    List<GroceryItem> findAll(String category);
    
    public long count();

}