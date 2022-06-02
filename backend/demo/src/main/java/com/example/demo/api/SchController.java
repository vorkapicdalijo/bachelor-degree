package com.example.demo.api;


import com.example.demo.model.*;
import com.example.demo.service.SchService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("sch")
@RestController
public class SchController {

    private final SchService schService;

    @Autowired
    public SchController(SchService schService) {
        this.schService = schService;
    }

    @PostMapping("/xd")
    public String insertSch(@RequestBody ScheduleDTO schedule) {
        System.out.println(schedule);

        if(schedule.getAdded().size() != 0) {
            this.schService.insertSch(schedule.getAdded().get(0));
        }

        else if(schedule.getDeleted().size() != 0) {
            this.schService.deleteSch(schedule.getDeleted().get(0).getId());
        }
        else if(schedule.getChanged().size() != 0) {
            this.schService.updateSch(schedule.getChanged().get(0).getId(), schedule.getChanged().get(0));
        }

        ScheduleResult result = new ScheduleResult();
        result.setResult(this.schService.getSch());

        JSONObject obj = new JSONObject();
        obj.put("result",this.schService.getSch());

        return obj.toString();
        //return "{\"result\":[{\"Subject\":\"VVV\",\"Id\":2,\"StartTime\":\"2022-05-29T03:00:00.000Z\",\"EndTime\":\"2022-05-29T03:30:00.000Z\"}, \"Subject\":\"WWWWV\",\"Id\":3,\"StartTime\":\"2022-05-29T07:00:00.000Z\",\"EndTime\":\"2022-05-29T09:30:00.000Z\"}],\"count\":2}";
    }

    @PostMapping
    public List<ScheduleAction> getSch() {

        return this.schService.getSch();
    }
}
