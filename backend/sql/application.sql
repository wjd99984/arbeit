create table application
(
    jobs_id   int                                  not null,
    member_id int                                  not null,
    resume_id int                                  null,
    title     varchar(100)                         not null,
    comment   varchar(1500)                        not null,
    is_passed tinyint(1)                           null,
    inserted  datetime default current_timestamp() not null,
    primary key (jobs_id, member_id),
    constraint application_ibfk_1
        foreign key (jobs_id) references jobs (id),
    constraint application_ibfk_2
        foreign key (member_id) references member (id),
    constraint application_ibfk_3
        foreign key (resume_id) references resume (id)
);

create index member_id
    on application (member_id);

create index resume_id
    on application (resume_id);

select *
from application;

DELETE
FROM application
WHERE member_id = 69;

SELECT DISTINCT j.member_id boss_id, r.member_id
FROM resume r
         JOIN application a ON r.id = a.resume_id
         JOIN jobs j ON a.jobs_id = j.id
WHERE resume_id = 36;

ALTER TABLE application
    ADD CONSTRAINT application_ibfk_3
        FOREIGN KEY (resume_id) REFERENCES resume (id)
            ON DELETE SET NULL;

ALTER TABLE application
    DROP FOREIGN KEY application_ibfk_3;

SELECT DISTINCT m.id   albaId,
                m.name albaName,
                s.name
FROM jobs j
         JOIN application a ON j.id = a.jobs_id
         JOIN member m ON a.member_id = m.id
         JOIN store s ON j.store_id = s.id
WHERE j.member_id = 68;

SELECT *
FROM review_to_alba
WHERE boss_id = 68
  AND alba_id = 69;