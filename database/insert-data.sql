INSERT INTO
    Users
VALUES
    (
        260,
        'VCHar',
        'secret123',
        'vchar@example.com',
        1,
        null
    );

INSERT INTO
    Users
VALUES
    (
        305,
        'Donatello',
        'secret234',
        'dona@example.com',
        1,
        null
    );

INSERT INTO
    MediaItems (
        filename,
        filesize,
        title,
        description,
        user_id,
        media_type,
        created_at
    )
VALUES
    (
        'ffd8.jpg',
        887574,
        'Favorite drink',
        null,
        305,
        'image/jpeg',
        null
    ),
    (
        'dbbd.jpg',
        60703,
        'Miika',
        'My Photo',
        305,
        'image/jpeg',
        null
    ),
    (
        '2f9b.jpg',
        30635,
        'Aksux and Jane',
        'friends',
        260,
        'image/jpeg',
        null
    );

INSERT INTO
    Comments (
        media_id,
        user_id,
        comment_text,
        created_at
    )
VALUES
    (
        1,
        260,
        'Nice!',
        null
    ),
    (
        1,
        305,
        'I like it!',
        null
    ),
    (
        2,
        260,
        'Nice!',
        null
    ),
    (
        2,
        305,
        'I like it!',
        null
    ),
    (
        3,
        260,
        'Nice!',
        null
    ),
    (
        3,
        305,
        'I like it!',
        null
    );