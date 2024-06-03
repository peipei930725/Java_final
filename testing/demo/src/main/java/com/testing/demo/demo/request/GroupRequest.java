package com.testing.demo.demo.request;

public class GroupRequest {
    private String groupName;
    private int groupSize;
    private String account;
    // Getters and Setters
    public String getAccount() {
        return account;
    }

    // Getters and Setters
    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public int getGroupSize() {
        return groupSize;
    }

    public void setGroupSize(String groupSize) {
        Integer groupSizeI = Integer.valueOf(groupSize);
        this.groupSize = groupSizeI;
    }

}
