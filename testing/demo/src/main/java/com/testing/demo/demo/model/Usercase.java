    package com.testing.demo.demo.model;

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
    }