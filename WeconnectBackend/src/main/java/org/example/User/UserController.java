package org.example.User;

import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@RequestMapping("/")
public class UserController {
    UserService service;
    @RequestMapping(value = "/user",method= RequestMethod.POST)
   ResponseEntity<String> CreateUser(@RequestBody User user) throws SQLException, ClassNotFoundException {
            service = new UserService();
            if(service.saveUser(user))
                return new ResponseEntity<>(HttpStatus.CREATED);
            else
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
    @RequestMapping(value="/user",method=RequestMethod.GET)
    ResponseEntity<String> validateUser(@RequestParam("username") String username,@RequestParam("password")String password) throws SQLException, ClassNotFoundException {
        service = new UserService();
        System.out.println("GET called ");
        String id = service.validateUser(username,password);
        if(id.equals("")){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }else{
            return new ResponseEntity<>("{\"id\" : \""+id+"\"}",HttpStatus.ACCEPTED);
        }
    }
    @RequestMapping(value="search/{q}",method=RequestMethod.GET)
    ResponseEntity<String> Search(@PathVariable("q") String q){
        return new ResponseEntity<>(q,HttpStatus.OK);
    }
}
