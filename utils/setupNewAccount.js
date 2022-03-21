const pool = require("../db");
const date = require("date-and-time");
const logger = require("./logger");

const today = new Date();
const yesterday = date.addDays(today, -1);

const addTasks = async (tasks, userId) => {
    for (const task of tasks) {
        await pool.query(`
            INSERT INTO
                task (description, is_completed, date, time, folder_id, user_id)
            VALUES
                ($1, $2, $3, $4, $5, $6);
            `, [task.description, task.isCompleted, task.date, task.time, task.folderId, userId]);
        logger.info("Task has been created: " + task.description);
    }
}

const addFolderTasks = async ({ folderName, colorId }, tasks = [], userId) => {
    const addFolder = await pool.query(`
                INSERT INTO
                    folder (name, color_id, user_id)
                VALUES
                    ($1, $2, $3)
                RETURNING 
                    id;
                `,
        [folderName, colorId, userId]);
    const folderId = addFolder.rows[0].id;

    for (const task of tasks) {
        task.folderId = folderId;
    }

    await addTasks(tasks, userId);
}

const setupNewAccount = async (userId) => {
    try {
        if (!userId) return logger.error("Missing credentials: userId");

        await addFolderTasks({ folderName: "Showcase", colorId: 4 }, [
            {
                description: 'Tasks which are not related to any project go to "Inbox"',
                isCompleted: false,
                date: null,
                time: null,
                folderId: null
            },
            {
                description: 'This task related to a project "Showcase"',
                isCompleted: false,
                date: null,
                time: null,
                folderId: null
            }
        ], userId)

        await addFolderTasks({ folderName: "Time travel", colorId: 2 }, [
            {
                description: "Tasks with red dates are overdue",
                isCompleted: false,
                date: date.format(yesterday, "YYYY-MM-DD"),
                time: "13:30",
                folderId: null
            },
            {
                description: "You can also specify time",
                isCompleted: false,
                date: date.format(today, "YYYY-MM-DD"),
                time: "23:17",
                folderId: null
            },
            {
                description: "Tasks can have dates",
                isCompleted: false,
                date: date.format(today, "YYYY-MM-DD"),
                time: null,
                folderId: null
            }
        ], userId)

        await addTasks([
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
        ], userId)

    } catch (error) {
        console.error(error.message);
    }
}

module.exports = setupNewAccount;