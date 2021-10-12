-- Создать базу данных
CREATE DATABASE todolist;

-- Scheme of folder
CREATE TABLE folder(
    id SERIAL PRIMATY KEY,
    name TEXT NOT NULL,
    color BYTEA,
)

-- Scheme of tasklist
CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    status_of_completion BOOLEAN DEFAULT FALSE NOT NULL,
    time_of_creation TIMESTAMP DEFAULT NOW() NOT NULL,
    time_of_last_update TIMESTAMP DEFAULT NOW() NOT NULL,
    date DATE,
    time TIME CHECK (date != NULL),
    folder_id SERIAL REFERENCES folder (id)
);

-- Adding new task with description only
INSERT INTO task (description) VALUES ('This is my first task');

-- Adding new task with description and data
INSERT INTO task (description, date) VALUES ('This is my task description', '2021-10-28');


-- Adding new task with description, data and time
INSERT INTO task (description, date, time) VALUES ('This is description', '2021-10-28', '16:05');


