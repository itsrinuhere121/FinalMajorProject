package org.example.User;

import org.example.Config;

import java.sql.*;
import java.util.UUID;

public class UserService {
    final Connection connection;
    String id =  UUID.randomUUID().toString().replace("-", "").substring(0, 10);
    public UserService() throws ClassNotFoundException, SQLException {
        Class.forName("org.postgresql.Driver");
        this.connection= DriverManager.getConnection(Config.u);
    }
    int res=0;
     boolean  saveUser(User user){
        try{
            String sql = "insert into userTable values ('" + id+ "','"+user.getUsername()+"','" + user.getPassword() + "');";
            res =this.connection.createStatement().executeUpdate(sql);
        }catch(Exception ex){
            System.out.println(ex.toString());
        }
        return res!=0;
    }
   String validateUser(String username ,String password){
         String id="";
        try{
            String sql ="select userid from userTable where username='"+username+"' and password ='"+password+"';";
            PreparedStatement ps = this.connection.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while(rs.next()) {
                id = rs.getString("userid");
            }
        }catch(Exception ex){
            System.out.println(ex.toString());
        }
        return id;
    }
}
