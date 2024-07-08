package com.backend.domain.board.form;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CommentListForm {

    private Integer id;
    private Integer memberId;
    private String memberName;
    private String comment;
    private LocalDateTime inserted;

    public String getInserted() {
        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul"));

        Duration duration = Duration.between(inserted, now);

        long days = duration.toDays();
        long hours = duration.toHours() % 24;
        long minutes = duration.toMinutes() % 60;
        long seconds = duration.getSeconds() % 60;

        if (days >= 1) {
            return STR."\{days}일 전";
        } else if (hours >= 1) {
            return STR."\{hours}시간 전";
        } else if (minutes >= 1) {
            return STR."\{minutes}분 전";
        } else {
            return STR."\{seconds}초 전";
        }
    }
}
