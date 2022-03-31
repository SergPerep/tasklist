
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
    folder (name, color_id, user_id)
VALUES
    ('Music', 2, '2c50eb21-e0dc-4c62-97ed-f593338b748a');

-- Update folder
UPDATE
    folder
SET
    name = 'Piano',
    color_id = 3
WHERE
    id = 8 AND user_id = '2c50eb21-e0dc-4c62-97ed-f593338b748a';

-- Delete folder
DELETE FROM
    task
WHERE
    folder_id = 5 AND user_id = '2c50eb21-e0dc-4c62-97ed-f593338b748a';

DELETE FROM
    folder
WHERE
    id = 5 AND user_id = '2c50eb21-e0dc-4c62-97ed-f593338b748a';
