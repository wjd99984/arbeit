DROP TABLE jobs;
# 최신 DB 기준
CREATE TABLE jobs
(
    id         INT AUTO_INCREMENT PRIMARY KEY,
    member_id INT NOT NULL REFERENCES member(id),
    store_id INT NOT NULL REFERENCES store(id),
    category_id INT NOT NULL REFERENCES category(id),
    title      VARCHAR(100)  NOT NULL,
    content    VARCHAR(3000) NOT NULL,
    salary INT NOT NULL ,
    deadline DATETIME NOT NULL ,
    recruitment_number INT NOT NULL ,
    store_name VARCHAR(45)   NOT NULL,
    inserted   DATETIME      NOT NULL DEFAULT NOW()
);

DESC jobs;

SELECT *
FROM jobs;


# 게시글 여러개 입력.
INSERT INTO jobs
    (title, content, store_name, store_id, boss_id)
SELECT title, content, store_name, store_id, boss_id
FROM jobs;


ALTER TABLE jobs
    ADD CONSTRAINT fk_member
        FOREIGN KEY (member_id)
            REFERENCES member (id);

SELECT * FROM category;
SELECT * FROM store;
SELECT * FROM jobs;

INSERT INTO jobs
(member_id, store_id, category_id, title, content,
 salary, deadline, recruitment_number, store_name)
VALUES
(28,8,2,'테스트중','테스트용 내용입니다. 테스트용 내용입니다. 테스트용 내용입니다.','9500','2024-06-10 09:00:00','10','배달의민족');