--Schema for color
CREATE TABLE color(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    value VARCHAR(255) NOT NULL
);

-- Add color
INSERT INTO
    color (name, value)
VALUES
    (
        'Orange',
        '#FF9749'
    );

-- Change color
UPDATE
    color
SET
    value = '#681735'
WHERE
    id = 4;