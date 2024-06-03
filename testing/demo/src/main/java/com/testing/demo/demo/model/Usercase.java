package com.testing.demo.demo.model;


import java.util.ArrayList;

import org.springframework.data.annotation.Id;
    import org.springframework.data.mongodb.core.mapping.Document;

    @Document(collection = "UserCase")
    public class UserCase {
        @Id
        private String id;
        private String userAccount;
        private String userPassword;
        private String FirstName;
        private String LastName;
        private ArrayList<String> userTradeList = new ArrayList<String>();
        private ArrayList<String> userGroupList = new ArrayList<String>();
        private ArrayList<String> userStateList = new ArrayList<String>();

        // getters
        public String getId() {
            return id;
        }

        public String getUserAccount() {
            return userAccount;
        }

        public String getUserPassword() {
            return userPassword;
        }

        public String getFirstName() {
            return FirstName;
        }

        public String getLastName() {
            return LastName;
        }

        public ArrayList<String> getUserTradeList() {
            return userTradeList;
        }

        public ArrayList<String> getUserGroupList() {
            return userGroupList;
        }

        public ArrayList<String> getUserStateList() {
            return userStateList;
        }

        // setters
        public void setId(String id) {
            this.id = id;
        }

        public void setUserAccount(String userAccount) {
            this.userAccount = userAccount;
        }

        public void setUserPassword(String userPassword) {
            this.userPassword = userPassword;
        }

        public void setFirstName(String FirstName) {
            this.FirstName = FirstName;
        }

        public void setLastName(String LastName) {
            this.LastName = LastName;
        }

        public void addUserTradeList(String tradeId) {
            this.userTradeList.add(tradeId);
        }

        public void addUserGroupList(String groupId) {
            this.userGroupList.add(groupId);
        }

        public void setUserTradeList(ArrayList<String> userTradeList) {
            this.userTradeList = userTradeList;
        }

        public void addUserStateList(String state) {
            this.userStateList.add(state);
        }

        public void setUserGroupList(ArrayList<String> userGroupList) {
            this.userGroupList = userGroupList;
        }
    }