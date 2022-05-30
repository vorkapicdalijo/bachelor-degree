package com.example.demo.api;


import com.example.demo.model.Sch;
import com.example.demo.service.SchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
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
    public void insertSch(@Valid @NonNull @RequestBody Object obj) {
        /*System.out.println(sch.getId());
        System.out.println(sch.getSubject());
        System.out.println(sch.getStartTime());
        System.out.println(sch.getEndTime());
        System.out.println(sch.getIsAllDay());
        schService.insertSch(sch); */
        System.out.println(obj);
    }

    @GetMapping
    public List<Sch> getSch() {
        System.out.println(schService.getSch().toString());
        return schService.getSch();
    }
}
