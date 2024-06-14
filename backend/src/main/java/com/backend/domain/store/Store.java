package com.backend.domain.store;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Getter
@AllArgsConstructor
public class Store {

    private Integer id;
    private String name;
    private String content;
    private String address;
    private String detailAddress;
    private String phone;
    private LocalDateTime inserted;
    private Integer memberId;
    private Integer categoryId;
    private String categoryName;

    public String getInsertedDate() {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        return inserted.format(formatter);
    }
}
