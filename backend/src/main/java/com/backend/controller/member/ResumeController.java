package com.backend.controller.member;

import com.backend.domain.member.resume.Resume;
import com.backend.domain.member.resume.ResumeForm;
import com.backend.service.member.ResumeService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class ResumeController {
    private final ResumeService resumeService;

    @PostMapping("/resume/register")
    @PreAuthorize("hasAuthority('SCOPE_ALBA')")
    public ResponseEntity register(@Validated @RequestBody ResumeForm form, BindingResult bindingResult,
                                   Authentication authentication) {
        if (bindingResult.hasErrors()) {
            Map<String, String> errors = getErrorMessages(bindingResult);
            return ResponseEntity.badRequest().body(errors);
        }

        if (!resumeService.isMaxedInsert(authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        resumeService.register(form, authentication);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{id}/resume/list")
    @PreAuthorize("isAuthenticated()")
    public List<Resume> list(@PathVariable("id") Integer memberId, Authentication authentication) {
        return resumeService.findAllByMemberId(memberId);
    }

    @GetMapping("/resume/{id}")
    @PreAuthorize("isAuthenticated()")
    public Resume view(@PathVariable("id") Integer id,
                       Authentication authentication) {

        return resumeService.findById(id);
    }

    @PutMapping("/resume/{id}")
    @PreAuthorize("hasAuthority('SCOPE_ALBA')")
    public ResponseEntity edit(@PathVariable Integer id, @Validated @RequestBody ResumeForm form,
                               BindingResult bindingResult, Authentication authentication) {

        if (!resumeService.hasAccess(id, authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        if (bindingResult.hasErrors()) {
            Map<String, String> errors = getErrorMessages(bindingResult);
            log.info("errors={}", errors);
            return ResponseEntity.badRequest().body(errors);
        }

        resumeService.edit(id, form);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/resume/delete")
    @PreAuthorize("hasAuthority('SCOPE_ALBA')")
    public ResponseEntity delete(@RequestBody List<Integer> ids, Authentication authentication) {

        if (!resumeService.hasAccess(ids, authentication)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        resumeService.delete(ids);
        return ResponseEntity.ok().build();
    }

    private static Map<String, String> getErrorMessages(BindingResult bindingResult) {
        Map<String, String> errors = new ConcurrentHashMap<>();
        for (FieldError error : bindingResult.getFieldErrors()) {
            errors.put(error.getField(), error.getDefaultMessage());
        }
        return errors;
    }
}
