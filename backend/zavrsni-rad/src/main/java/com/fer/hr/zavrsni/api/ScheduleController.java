package com.fer.hr.zavrsni.api;


import com.fer.hr.zavrsni.model.ScheduleData;
import com.fer.hr.zavrsni.model.Schedule;
import com.fer.hr.zavrsni.model.User;
import com.fer.hr.zavrsni.service.ScheduleService;
import com.fer.hr.zavrsni.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Base64;
import java.util.List;


@RequestMapping("sch")
@RestController
public class ScheduleController {

    private final ScheduleService scheduleService;
    private final UserService userService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService, UserService userService) {
        this.scheduleService = scheduleService;
        this.userService = userService;
    }

    @PostMapping("/xd")
    public String insertSch(@RequestBody Schedule schedule, @RequestHeader("Authorization") String access_token) {
        Base64.Decoder decoder = Base64.getUrlDecoder();
        access_token = access_token.replace("Bearer ", "");
        String payload = new String(decoder.decode(access_token.split("\\.")[1]));
        JSONObject user_obj = new JSONObject(payload);

        String username = user_obj.getString("sub");

        User user = userService.getUser(username);

        if(schedule.getAdded().size() != 0) {
            this.scheduleService.insertSch(schedule.getAdded().get(0), user.getUser_id());
        }

        else if(schedule.getDeleted().size() != 0) {
            this.scheduleService.deleteSch(schedule.getDeleted().get(0).getId());
        }
        else if(schedule.getChanged().size() != 0) {
            this.scheduleService.updateSch(schedule.getChanged().get(0).getId(), schedule.getChanged().get(0));
        }

        JSONObject obj = new JSONObject();
        obj.put("result",this.scheduleService.getSch(user.getUser_id()));

        return obj.toString();
        //return "{\"result\":[{\"Subject\":\"VVV\",\"Id\":2,\"StartTime\":\"2022-05-29T03:00:00.000Z\",\"EndTime\":\"2022-05-29T03:30:00.000Z\"}, \"Subject\":\"WWWWV\",\"Id\":3,\"StartTime\":\"2022-05-29T07:00:00.000Z\",\"EndTime\":\"2022-05-29T09:30:00.000Z\"}],\"count\":2}";
    }

    @PostMapping
    public List<ScheduleData> getSch(@RequestHeader("Authorization") String access_token) {
        Base64.Decoder decoder = Base64.getUrlDecoder();
        access_token = access_token.replace("Bearer ", "");
        String payload = new String(decoder.decode(access_token.split("\\.")[1]));
        JSONObject user_obj = new JSONObject(payload);

        String username = user_obj.getString("sub");

        User user = userService.getUser(username);

        return this.scheduleService.getSch(user.getUser_id());
    }
}
