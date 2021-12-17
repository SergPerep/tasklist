--Schema for color
CREATE TABLE color(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,
    font VARCHAR(255) NOT NULL,
    fill VARCHAR(255) NOT NULL
);

-- Schema for folder
CREATE TABLE folder(
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    color_id INTEGER REFERENCES color (id)
);

-- Schema for tasklist
CREATE TABLE task(
    id SERIAL PRIMARY KEY,
    description VARCHAR(255),
    status_of_completion BOOLEAN DEFAULT FALSE NOT NULL,
    time_of_creation TIMESTAMP DEFAULT NOW() NOT NULL,
    time_of_last_update TIMESTAMP DEFAULT NOW() NOT NULL,
    date_and_time TIMESTAMP,
    read_time BOOLEAN DEFAULT FALSE CHECK (date_and_time != NULL),
    folder_id INTEGER REFERENCES folder (id)
);

-- Add Orange
INSERT INTO
    color (name, label, font, fill)
VALUES
    (
        'Orange',
        '#FF9749',
        '#875306',
        'rgba(211, 136, 23, 0.28)'
);

-- Add Blue
INSERT INTO
    color (name, label, font, fill)
VALUES
    (
        'Blue',
        '#3D77F6',
        '#254894',
        'rgba(65, 87, 135, 0.2)'
);

-- Add Green
INSERT INTO
    color (name, label, font, fill)
VALUES
    (
        'Green',
        '#169446',
        '#19522F',
        'rgba(31, 116, 64, 0.18)'
);

-- Add Berry Red
INSERT INTO
    color (name, label, font, fill)
VALUES
    (
        'Berry Red',
        '#BC245D',
        '#681735',
        'rgba(151, 17, 67, 0.16)'
);