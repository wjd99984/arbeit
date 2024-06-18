package com.backend.controller.management;

import com.backend.controller.application.MemberId;
import com.backend.domain.application.Application;
import com.backend.domain.management.Management;
import com.backend.service.management.ManagementService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/jobs")
public class ManagementController {
    private final ManagementService service;

    @PutMapping("{idd}/management/decision")
    public void insertDecision(@RequestBody Management management, @PathVariable Integer idd) {
        service.insertDecision(management);
    }

    @GetMapping("{resumeId}/management/select")
    public Application select(@RequestParam Integer jobsId, @PathVariable Integer resumeId) {
        return service.select(jobsId, resumeId);
    }

    @GetMapping("management/list")
    public List<Management> list(@MemberId Integer memberId) {
        List<Management> list = service.list(memberId);
        return list;
    }

    @GetMapping("management/alarm-count")
    public Integer alarmCount(@MemberId Integer memberId) {
        return service.alarmCount(memberId);
    }
}