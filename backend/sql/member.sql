use arbeit;

DROP TABLE member;

CREATE TABLE member
(
    id        INT PRIMARY KEY AUTO_INCREMENT,
    email     VARCHAR(50)  NOT NULL UNIQUE,
    password  VARCHAR(100) NOT NULL,
    name      VARCHAR(10)  NOT NULL,
    address   VARCHAR(100) NOT NULL,
    phone     VARCHAR(11)  NOT NULL,
    authority VARCHAR(10)  NOT NULL,
    inserted  DATETIME     NOT NULL DEFAULT NOW()
);

DROP TABLE authority;
CREATE TABLE authority
(
    member_id INT REFERENCES member (id),
    name      VARCHAR(3) NOT NULL,
    PRIMARY KEY (member_id, name)
);

show tables;

# INSERT INTO member (email, password, name, address, phone, authority)
# VALUES ('admin@admin', '123', 'admin', '관리자 주소', '관리자 전화번호', 'ADMIN');

SELECT *
FROM member;