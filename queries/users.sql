-- User schema
CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Add new user
INSERT INTO
    users (username, password)
VALUES
    ('Bob', 'hash-password');