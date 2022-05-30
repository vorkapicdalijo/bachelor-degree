package com.example.demo.api;

import com.example.demo.model.Schedule;
import com.example.demo.service.ScheduleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("schedule")
@RestController
public class ScheduleController {

    private final ScheduleService scheduleService;

    @Autowired
    public ScheduleController(ScheduleService scheduleService) {
        this.scheduleService = scheduleService;
    }

    //@PostMapping
    //public void addSchedule(@Valid @NonNull @RequestBody Schedule schedule) {
      //  scheduleService.addSchedule(schedule);
   // }

    @PostMapping
    public void test(@Valid @NonNull @RequestBody Object obj) {
        System.out.println(obj);
    }

    @GetMapping
    public List<Schedule> getWholeSchedule() {
        return scheduleService.getWholeSchedule();
    }
    @GetMapping(path = "{user_id}")
    public List<Schedule> getScheduleForUser(@PathVariable("user_id") int user_id) {
        return scheduleService.getScheduleFromUser(user_id);
    }

    /*@DeleteMapping(path = "{id}")
    public void deleteSchedule(@PathVariable("id") int id) {
        scheduleService.deleteSchedule(id);
    }
     */
    @DeleteMapping(path = "{user_id}")
    public void deleteWholeUserSchedule(@PathVariable("user_id") int user_id) {
        scheduleService.deleteWholeUserSchedule(user_id);
    }
    @PutMapping(path = "{id}")
    public void updateSchedule(@PathVariable("id") int id, @Valid @NonNull @RequestBody Schedule schedule) {
        scheduleService.updateSchedule(id, schedule);
    }
}
