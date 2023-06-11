package org.example.Alert;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class trends {
    @Column(name="matchedwords")
    String matchedwords;
    @Column(name="alertid")
    String alertid;
    @Column(name="created")
    String created;

    public String getMatchedwords() {
        return matchedwords;
    }

    public void setMatchedwords(String matchedwords) {
        this.matchedwords = matchedwords;
    }

    public String getAlertid() {
        return alertid;
    }

    public void setAlertid(String alertid) {
        this.alertid = alertid;
    }

    public String getCreated() {
        return created;
    }

    public void setCreated(String created) {
        this.created = created;
    }
}
