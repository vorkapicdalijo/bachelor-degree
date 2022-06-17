package com.fer.hr.zavrsni.api;

import com.fer.hr.zavrsni.model.Progress;
import com.fer.hr.zavrsni.model.User;
import com.fer.hr.zavrsni.service.ProgressService;
import com.fer.hr.zavrsni.service.UserService;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Base64;
import java.util.List;

@RequestMapping("progress")
@RestController
public class ProgressController {

    private final ProgressService progressService;
    private final UserService userService;

    @Autowired
    public ProgressController(ProgressService progressService, UserService userService) {
        this.progressService = progressService;
        this.userService = userService;
    }

    @PostMapping
    public void insertProgress(@Valid @NonNull @RequestBody Progress progress) {
        progressService.insertProgress(progress);
    }

    @GetMapping
    public List<Progress> getProgresses(@RequestHeader("Authorization") String access_token) {
        Base64.Decoder decoder = Base64.getUrlDecoder();
        access_token = access_token.replace("Bearer ", "");
        String payload = new String(decoder.decode(access_token.split("\\.")[1]));
        JSONObject user_obj = new JSONObject(payload);

        String username = user_obj.getString("sub");

        User user = userService.getUser(username);
        return progressService.getProgresses(user.getUser_id());
    }
}
