package com.backend.domain.board;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Duration;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Board {

    private Integer id;
    private Integer memberId;
    private String name;
    private String title;
    private String content;

    private LocalDateTime inserted;

    private Integer numberOfComments;
    private Integer numberOfImages;
    private Integer numberOfLike;
    private Integer numberOfView;

    public Board(Integer id, String title, String content) {
        this.id = id;
        this.title = title;
        this.content = content;
    }

    public String getInserted() {

        ZonedDateTime now = ZonedDateTime.now(ZoneId.of("Asia/Seoul")); // Set your timezone

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
