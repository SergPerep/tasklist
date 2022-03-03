const pool = require("../db");
const date = require("date-and-time");
const logger = require("./logger");

const today = new Date();
const yesterday = date.addDays(today, -1);

module.exports = async (userId) => {
    try {
        if(!userId) return logger.error("Missing credentials: userId");
        const addFolder = await pool.query(`
            INSERT INTO
                folder (name, color_id, user_id)
            VALUES
                ($1, $2, $3)
            RETURNING 
                id;
            `,
            ["Test project", 1, userId]);
        const folderId = await addFolder.rows[0].id;

        // logger.info("Folder has been created");

        const taskList = [
            {
                description: "Tasks of a project have colorful labels",
                isCompleted: false,
                date: date.format(today, "YYYY-MM-DD"),
                time: null,
                folderId: folderId
            },
            {
                description: "You can hide completed tasks through top-right “•••”",
                isCompleted: true,
                date: null,
                time: null,
                folderId: null
            },
            {
                description: "This task is overdue",
                isCompleted: false,
                date: date.format(yesterday, "YYYY-MM-DD"),
                time: null,
                folderId: null
            },
            {
                description: "Click on “+ New project” on the left side to create new project",
                isCompleted: false,
                date: null,
                time: null,
                folderId: null
            },
            {
                description: "Set date and time",
                isCompleted: false,
                date: date.format(today, "YYYY-MM-DD"),
                time: "18:00",
                folderId: null
            },
            {
                description: "Add new task",
                isCompleted: false,
                date: null,
                time: null,
                folderId: null
            }
        ]

        for (const task of taskList) {

            const newTodo = await pool.query(`
            INSERT INTO
                task (description, is_completed, date, time, folder_id, user_id)
            VALUES
                ($1, $2, $3, $4, $5, $6);
            `, [task.description, task.isCompleted, task.date, task.time, task.folderId, userId]);
            // logger.info("Task has been created: " + task.description);
        }

    } catch (error) {
        console.error(error.message);
    }
}