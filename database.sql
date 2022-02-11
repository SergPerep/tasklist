-- Создать базу данных
CREATE DATABASE todolist;

-- Schema of folder
CREATE TABLE folder(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    color_id INTEGER REFERENCES color (id),
    user_id uuid REFERENCES users (id) NOT NULL
);

-- Get all folders
SELECT
    id,
    name,
    color_id
FROM
    folder;

-- Add new folder
INSERT INTO
    folder (name, color_id)
VALUES
    ('Music', 2);

-- Update folder
UPDATE
    folder
SET
    name = 'Piano',
    color_id = 3
WHERE
    id = 8;

-- Delete folder
DELETE FROM
    task
WHERE
    folder_id = 5;

DELETE FROM
    folder
WHERE
    id = 5;

-- Schema of tasklist
CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    is_completed BOOLEAN DEFAULT FALSE NOT NULL,
    time_of_creation TIMESTAMP DEFAULT NOW() NOT NULL,
    date DATE,
    time TIME WITH TIME ZONE CHECK (date != NULL),
    folder_id INTEGER REFERENCES folder (id),
    user_id uuid REFERENCES users (id) NOT NULL
);

-- Adding new task with description only
INSERT INTO
    task (description)
VALUES
    ('This is my first task');

-- Adding new task with description and data
INSERT INTO
    task (description, date)
VALUES
    ('This is my task description', '2021-10-28');

-- Adding new task with description, data, time and folder
INSERT INTO
    task (description, date, time, folder_id)
VALUES
    ('This is tomorrow task', '2021-10-20', '4:00', 1);

-- Get all tasks
SELECT
    task.id as id,
    description,
    is_completed,
    time_of_creation,
    date,
    time,
    folder.name as folder_name,
    folder.id as folder_id
FROM
    task
    LEFT JOIN folder ON folder.id = task.folder_id
ORDER BY
    time_of_creation DESC;

INSERT INTO
    task (description, date, time, folder_id)
VALUES
    (
        'Search for a good physeotherapist in Houten and Utrecht. And add new meeting to calendar.',
        '2021-10-19',
        '16:05',
        1
    );

INSERT INTO
    task (description, date, time, folder_id)
VALUES
    (
        'Doing the best that I can',
        '2021-11-24',
        '11:30',
        1
    );

INSERT INTO
    task (description, date, time)
VALUES
    (
        'I dont know the time',
        '2021-11-24 11:30',
        false
    );

-- Update task status
UPDATE
    task
SET
    is_completed = TRUE
WHERE
    id = 1;

-- Delete task
DELETE FROM
    task
WHERE
    id = 6;

--Edit task
UPDATE
    task
SET
    description = 'New description',
    date = '2021-10-19 16:05',
    time = TRUE,
    folder_id = 1
WHERE
    id = 30;

--Schema for color
CREATE TABLE color(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,
    font VARCHAR(255) NOT NULL,
    fill VARCHAR(255) NOT NULL
);

-- Add color
INSERT INTO
    color (name, label, font, fill)
VALUES
    (
        'Orange',
        '#FF9749',
        '#DA7B35',
        'rgba(255, 151, 73, 0.14)'
    );

-- Change color
UPDATE
    color
SET
    font = '#681735',
    fill = 'rgba(151, 17, 67, 0.16)'
WHERE
    id = 4;