DROP DATABASE IF EXISTS mediashare;

CREATE DATABASE mediashare;

USE mediashare;

CREATE TABLE UserLevels (
    user_level_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    user_level_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Users (
    user_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    user_level_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL,
    FOREIGN KEY (user_level_id) REFERENCES UserLevels(user_level_id)
);

CREATE TABLE MediaItems (
    media_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    filename VARCHAR(255) NOT NULL UNIQUE,
    filesize INT NOT NULL,
    media_type VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255),
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (media_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Comments (
    comment_id INT NOT NULL AUTO_INCREMENT,
    media_id INT NOT NULL,
    user_id INT NOT NULL,
    comment_text VARCHAR(255) NOT NULL,
    created_at TIMESTAMP NOT NULL,
    PRIMARY KEY (comment_id),
    FOREIGN KEY (media_id) REFERENCES MediaItems(media_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

INSERT INTO
    UserLevels
VALUES
    (1, 'user');

INSERT INTO
    UserLevels
VALUES
    (2, 'manager');

INSERT INTO
    UserLevels
VALUES
    (3, 'admin');