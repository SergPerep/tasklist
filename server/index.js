const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Useless comment

// Middleware
app.use(cors())
app.use(express.json()); // parse req.body as json


// ROUTES //

// Get all tasks
app.get("/tasks", async (req, res) => {
    try {
        const allTasks = await pool.query("SELECT task.id as id, description, status_of_completion, time_of_creation, time_of_last_update, date_and_time, read_time, folder.name as folder FROM task LEFT JOIN folder ON folder.id = task.folder_id;");
        // Feedback to client
        res.json(allTasks.rows);
    } catch (error) {
        console.error(error.message);
    }
});

// Update task:
// Check or uncheck
// Edit descroption, dates and etc.
app.put("/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { status_of_completion, description, date_and_time, read_time, folder_id } = req.body;
        if (status_of_completion !== undefined) {
            const changeTaskStatus = await pool.query(`
            UPDATE
                task
            SET
                status_of_completion = $2,
                time_of_last_update = NOW()
            WHERE
                id = $1;
            `,
                [id, status_of_completion]
            );
        } else {
            const editTask = await pool.query(`
            UPDATE
                task
            SET
                description = $2,
                time_of_last_update = NOW(),
                date_and_time = $3,
                read_time = $4,
                folder_id = $5
            WHERE
                id = $1;
            `,
                [id, description, date_and_time, read_time, folder_id]);
        }
        res.json("Task was successfully updated!");
    } catch (error) {
        console.error(error.message);
    }
})


// Create a task

app.post("/tasks", async (req, res) => {
    try {
        const { description, date_and_time, read_time, folder_id } = req.body;
        const newTodo = await pool.query(`
            INSERT INTO
                task (description, date_and_time, read_time, folder_id)
            VALUES
                ($1, $2, $3, $4);
            `, [description, date_and_time, read_time, folder_id]);
        res.json("New task was created");
    } catch (error) {
        console.error(error.message);
    }
});

// Delete task

app.delete("/tasks/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const delTask = await pool.query(`
        DELETE FROM
            task
        WHERE
            id = $1;
        `, [id]);
        res.json("Task was successfully deleted!");
    } catch (error) {
        console.error(error.message);
    }
});

// Get all folders
app.get("/folders", async (req, res) => {
    try {
        const allFolders = await pool.query(`
        SELECT
            id,
            name
        FROM
            folder;
        `);
        // Feedback to client
        res.json(allFolders.rows);
    } catch (error) {
        console.error(error.message);
    }
})

app.listen(5000, () => {
    console.log("server started on port 5000")
});