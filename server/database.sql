-- Создать базу данных
CREATE DATABASE todolist;

-- Схема таблицы
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);