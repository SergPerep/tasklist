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