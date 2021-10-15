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
        const allTasks = await pool.query("SELECT task.id as id, description, status_of_completion, time_of_creation, time_of_last_update, date, time, folder.name as folder FROM task LEFT JOIN folder ON folder.id = task.folder_id;");
        // Feedback to client
        res.json(allTasks.rows);
    } catch (error) {
        console.error(error.message);
    }
});








app.listen(5000, () => {
    console.log("server started on port 5000")
});