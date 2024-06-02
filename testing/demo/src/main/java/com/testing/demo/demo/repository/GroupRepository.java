package com.testing.demo.demo.repository;
import org.springframework.data.mongodb.repository.MongoRepository;
import com.testing.demo.demo.model.GroupCase;

public  interface GroupRepository extends MongoRepository<GroupCase, String>{
    GroupCase findByGroupName(String groupName);
    GroupCase findByGroupId(String groupId);
}
