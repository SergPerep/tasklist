-- Create database
CREATE DATABASE tasklist;

-- Connect to database
\c tasklist;

-- Create users table
CREATE TABLE users(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- Create color table
CREATE TABLE color(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL
);

-- Create folder table
CREATE TABLE folder(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    color_id INTEGER REFERENCES color (id),
    user_id uuid REFERENCES users (id) NOT NULL
);

-- Create tasklist folder
CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE NOT NULL,
    date DATE,
    time TIME WITH TIME ZONE CHECK (date != NULL),
    folder_id INTEGER REFERENCES folder (id),
    user_id uuid REFERENCES users (id) NOT NULL,
    time_of_creation TIMESTAMP DEFAULT NOW() NOT NULL
);

-- Add Orange
INSERT INTO
    color (name, value)
VALUES
    (
        'Orange',
        '#FF9749'
    );

-- Add Blue
INSERT INTO
    color (name, value)
VALUES
    (
        'Blue',
        '#3D77F6'
    );

-- Add Green
INSERT INTO
    color (name, value)
VALUES
    (
        'Green',
        '#169446'
    );

-- Add Berry Red
INSERT INTO
    color (name, value)
VALUES
    (
        'Berry Red',
        '#BC245D'
    );