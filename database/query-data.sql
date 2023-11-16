SELECT
    *
FROM
    Users;

SELECT
    *
FROM
    MediaItems;

SELECT
    *
FROM
    Comments;

SELECT
    *
FROM
    MediaItems
WHERE
    user_id = 305;

SELECT
    *
FROM
    Comments
WHERE
    user_id = 305;

SELECT
    *
FROM
    Comments
WHERE
    media_id = 1;

SELECT
    UserLevels.user_level_name
FROM
    Users
    JOIN UserLevels ON Users.user_level_id = UserLevels.user_level_id
WHERE
    Users.user_id = 305;