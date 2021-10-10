const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Useless comment

// Middleware
app.use(cors())
app.use(express.json()); // parse req.body as json


// ROUTES //

// Create a todo
app.post("/todos", async (req, res) => {
    try {
        // Get data from the client
        const description = req.body.description;
        // Sending data to database
        const newTodo = await pool.query(
            "INSERT INTO todo (description) VALUES($1)", 
            [description]
            );
        // Feedback to client
        res.json("All good!");
    } catch (error) {
        console.error(error.message);
    }
});








app.listen(5000, () => {
    console.log("server started on port 5000")
});