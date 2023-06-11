package org.example.Alert;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import org.example.User.User;

import java.util.Date;
@Entity
public class Alert {
    //create table alerts
    //(
    //alertid text primary key,
    //userid text,
    //title text,
    //description text,
    //created timestamp,
    //links text,
    //	foreign key (userid) references  usertable(userid)
    //)
    @Column(name="alertid")
    String alertid;
    @Column(name="title")
    String title;
    @Column(name="description")
    String description;
    @Column(name="created")
    Date created;
    @Column(name="links")
    String links;

    public String getAlertid() {
        return alertid;
    }

    public void setAlertid(String alertid) {
        this.alertid = alertid;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getCreated() {
        return created;
    }

    public void setCreated(Date created) {
        this.created = created;
    }

    public String getLinks() {
        return links;
    }

    public void setLinks(String links) {
        this.links = links;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getUserid() {
        return userid;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

    @OneToOne
    User user;
    @Column(name="userid")
    String userid;

}
