package com.testing.demo.demo.model;

import org.springframework.data.annotation.Id;
import java.util.ArrayList;

public class GroupCase {
    @Id
    private String groupId;

    private String groupName;
    private int groupSize;
    private ArrayList<String> groupMember = new ArrayList<String>();

    // getters
    public String getGroupId() {
        return groupId;
    }

    public String getGroupName() {
        return groupName;
    }

    public int getGroupSize() {
        return groupSize;
    }

    public ArrayList<String> getGroupMember() {
        return groupMember;
    }

    // setters

    public void setGroupId(String groupId) {
        this.groupId = groupId;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public void setGroupSize(int groupSize) {
        this.groupSize = groupSize;
    }

    public void setGroupMember(ArrayList<String> groupMember) {
        this.groupMember = groupMember;
    }

    public void addGroupMember(String member) {
        this.groupMember.add(member);
    }
}

