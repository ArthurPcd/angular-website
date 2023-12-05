package com.javaspring.back.authentification;
import java.util.Date;

public class RegisterData {
    private String email;
    private String password;
    private Date birthdate;

    public RegisterData() {
    }

    public RegisterData(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public Date getBirthdate() {
        return birthdate;
    }
}
