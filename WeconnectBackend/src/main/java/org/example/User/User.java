package org.example.User;

import jakarta.persistence.*;

import java.io.Serializable;
@Entity
public class User implements Serializable {
    @Column(name="userid")
    String userId;

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name="userName")
    String username;
    @Column(name="password")
    String password;
}
