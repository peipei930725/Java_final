package com.testing.demo.demo.model;

public class RegisterRequest {
<<<<<<< HEAD
    private String firstName;
    private String lastName;
=======
    private String FirstName;
    private String LastName;
>>>>>>> 7a8f8c0e6c075ef891702431cb52668bfa58a304
    private String account;
    private String passwd;

    // Getters and Setters
    public String getFirstName() {
<<<<<<< HEAD
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
=======
        return FirstName;
    }
    
    public void setFirstName(String FirstName) {
        this.FirstName = FirstName;
>>>>>>> 7a8f8c0e6c075ef891702431cb52668bfa58a304
    }
    
    public String getLastName() {
<<<<<<< HEAD
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
=======
        return LastName;
    }
    
    public void setLastName(String LastName) {
        this.LastName = LastName;
>>>>>>> 7a8f8c0e6c075ef891702431cb52668bfa58a304
    }
    

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPasswd() {
        return passwd;
    }

    public void setPasswd(String passwd) {
        this.passwd = passwd;
    }
}
