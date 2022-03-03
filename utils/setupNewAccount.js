const pool = require("../db");
// const date = require("date-and-time");
const logger = require("./logger");

// const today = new Date();
// const yesterday = date.addDays(today, -1);

module.exports = async (userId) => {
    try {
        if (!userId) return logger.error("Missing credentials: userId");
        /*
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
        */
        // logger.info("Folder has been created");

        const taskList = [
            {
                description: "Create new project: push “New project” button in side-navigation.",
                isCompleted: false,
                date: null,
                time: null,
                folderId: null
            },
            {
                description: "Add new task. You can set up date, time and related project for the task.",
                isCompleted: false,
                date: null,
                time: null,
                folderId: null
            },

            {
                description: "Welcome to Tasklist!",
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