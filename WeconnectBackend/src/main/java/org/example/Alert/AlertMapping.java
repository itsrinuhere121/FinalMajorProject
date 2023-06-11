package org.example.Alert;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.*;
@RestController
@RequestMapping("/")
public class AlertMapping {
    AlertServices services;
    @RequestMapping(value = "/alert",method = RequestMethod.GET)
   ResponseEntity<List<Alert>> getAlerts() throws SQLException, ClassNotFoundException {
        services= new AlertServices();
        return new ResponseEntity<>(services.getAlerts(), HttpStatus.OK);
    }//backend completed and testing completed
    @RequestMapping(value = "/alert",method = RequestMethod.POST)
    ResponseEntity<String> Alert(@RequestBody Alert a) throws SQLException, ClassNotFoundException {
        services = new AlertServices();
        if(services.saveAlert(a)){
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }//backend completed and testing completed
    @RequestMapping(value = "/alert/{id}",method = RequestMethod.GET)
    protected ResponseEntity<Alert> getAlert(@PathVariable("id")String id) throws SQLException, ClassNotFoundException {
        services= new AlertServices();
        List<Alert> a = services.getAlerts();
        for(Alert i : a){
            if(i.getAlertid().equals(id)){
                return ResponseEntity.ok(i);
            }
        }
        return new  ResponseEntity<>(HttpStatus.NOT_FOUND);
    }//backend completed and testing completed
    @RequestMapping(value = "/alert/{id}",method = RequestMethod.DELETE)
    protected  ResponseEntity<String> deleteAlert(@PathVariable("id")String id) throws SQLException, ClassNotFoundException {
        services = new AlertServices();
        if(services.deleteAlert(id)){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }//backend completed and testing completed
    @RequestMapping(value="/trends",method=RequestMethod.GET)
    protected ResponseEntity<List<trends>> trendsData() throws SQLException, ClassNotFoundException {
        services = new AlertServices();
        return new ResponseEntity<List<trends>>(services.trends(),HttpStatus.OK);
    }
    @RequestMapping(value="/trend/{key}",method=RequestMethod.GET)
    protected ResponseEntity<List<Trendsls>> trendswithkey (@PathVariable("key") String key) throws SQLException, ClassNotFoundException {
        services = new AlertServices();
        return new ResponseEntity<>(services.getTrend(key),HttpStatus.OK);
    }
    @RequestMapping(value="/userpins/{id}",method=RequestMethod.GET)
    protected  ResponseEntity<List<Alert>> userpins(@PathVariable("id")String id) throws SQLException, ClassNotFoundException {
        services = new AlertServices();
return new ResponseEntity(services.getuserposts(id),HttpStatus.OK);
    }
}
