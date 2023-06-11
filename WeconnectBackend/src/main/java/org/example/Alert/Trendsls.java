package org.example.Alert;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Trendsls {
    @Column(name="alertid")
    String alertId;
    @Column(name="title")
    String title;

    public String getAlertId() {
        return alertId;
    }

    public void setAlertId(String alertId) {
        this.alertId = alertId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
