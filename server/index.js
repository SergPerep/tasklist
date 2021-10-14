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
        
        // Sending data to database
        // Feedback to client
        res.json();
    } catch (error) {
        console.error(error.message);
    }
});








app.listen(5000, () => {
    console.log("server started on port 5000")
});