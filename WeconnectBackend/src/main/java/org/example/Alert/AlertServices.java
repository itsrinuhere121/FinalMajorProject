package org.example.Alert;
import org.example.Config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class AlertServices {
    private  Connection connection;
    AlertServices() throws ClassNotFoundException, SQLException {
        Class.forName("org.postgresql.Driver");
        this.connection= DriverManager.getConnection(Config.u);
    }
    List<Alert> getAlerts() throws SQLException {
        Alert a ;
        List<Alert> ls = new ArrayList<>();
        String sql = "select * from alerts;";
        ResultSet rs =  this.connection.createStatement().executeQuery(sql);
        while(rs.next()){
            a = new Alert();
            a.setAlertid(rs.getString("alertid"));
            a.setUserid(rs.getString("userid"));
            a.setCreated(rs.getDate("created"));
            a.setTitle(rs.getString("title"));
            a.setDescription(rs.getString("description"));
            a.setLinks(rs.getString("links"));
            ls.add(a);
        }
        return ls;

    }
    boolean saveAlert(Alert alert) throws SQLException {
        String id =  UUID.randomUUID().toString().replace("-", "").substring(0, 10);
        String sql ="insert into alerts (alertid,userid,title,description,created,links) " +
                "values('"+id+"','"+ alert.getUserid()+"','"+alert.getTitle()+"','"+alert.getDescription()+"',now(),'"+alert.getLinks()+"');";
        int res = this.connection.createStatement().executeUpdate(sql);
        return res != 0;
    }
    boolean deleteAlert(String id) throws SQLException {
        String sql ="delete from alerts where alertid = '"+id+"';";
        int res = this.connection.createStatement().executeUpdate(sql);
        return res!=0;
    }
    List<trends> trends() throws SQLException {
        List<trends> data= new ArrayList<>();
        String sql="SELECT REGEXP_MATCHES(description, '#\\w+', 'g') AS matched_words,alertid,created FROM alerts" +
                " WHERE description ~ '#\\w+';";
        ResultSet s =this.connection.createStatement().executeQuery(sql);
        trends t;
        while(s.next()){
            t= new trends();
               t.setMatchedwords( s.getString("matched_words"));
                t.setAlertid(s.getString("alertid"));
                t.setCreated(s.getString("created"));
                data.add(t);
        }
        return data;
    }//testing  completed
protected List<Trendsls> getTrend(String id) throws SQLException {
       List<Trendsls> data= new ArrayList<>();
       String sql = "select alertid,title from alerts where description ~*  '#"+id+"';";
       ResultSet s = this.connection.createStatement().executeQuery(sql);
       Trendsls ls;
       while(s.next()){
           ls = new Trendsls();
           ls.setAlertId(s.getString("alertid"));
           ls.setTitle(s.getString("title"));
           data.add(ls);
       }
       return data;
}
List<Alert> getuserposts(String id) throws SQLException {
        String sql = "select * from alerts where userid='"+id+"';";
        ResultSet rs = this.connection.createStatement().executeQuery(sql);
        Alert a;
        List<Alert> data = new ArrayList<>();
        while(rs.next()){
            a = new Alert();
            a.setUserid(rs.getString("userid"));
            a.setDescription(rs.getString("description"));
            a.setCreated(rs.getDate("created"));
            a.setLinks(rs.getString("links"));
            a.setTitle(rs.getString("title"));
            a.setAlertid(rs.getString("alertid"));
            data.add(a);
        }
        return data;
}
}
