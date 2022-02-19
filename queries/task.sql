-- Schema of tasklist
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

-- Adding new task with description only
INSERT INTO
    task (description)
VALUES
    ('This is my first task');

-- Adding new task with description and data
INSERT INTO
    task (description, date_and_time)
VALUES
    ('This is my task description', '2021-10-28');

-- Adding new task with description, data, time and folder
INSERT INTO
    task (description, date_and_time, read_time, folder_id)
VALUES
    ('This is tomorrow task', '2021-10-20', true, 1);

-- Get all tasks
SELECT
    task.id as id,
    description,
    status_of_completion,
    time_of_creation,
    time_of_last_update,
    date_and_time,
    read_time,
    folder.name as folder_name,
    folder.id as folder_id
FROM
    task
    LEFT JOIN folder ON folder.id = task.folder_id
ORDER BY
    time_of_creation DESC;

INSERT INTO
    task (description, date_and_time, read_time, folder_id)
VALUES
    (
        'Search for a good physeotherapist in Houten and Utrecht. And add new meeting to calendar.',
        '2021-10-19 16:05',
        true,
        1
    );

INSERT INTO
    task (description, date_and_time, read_time, folder_id)
VALUES
    (
        'Doing the best that I can',
        '2021-11-24 11:30',
        true,
        1
    );

INSERT INTO
    task (description, date_and_time, read_time)
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
    is_completed = NOT task.is_completed
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
    time_of_last_update = NOW(),
    date_and_time = '2021-10-19 16:05',
    read_time = TRUE,
    folder_id = 1
WHERE
    id = 30;