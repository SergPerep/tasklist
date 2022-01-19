// Modules
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require("path");
const session = require("express-session");
const MongoDBStorage = require("connect-mongodb-session")(session);
const bcrypt = require("bcryptjs");

// Utils
const genHash = require("./utils/genHash");
const checkWhetherUserAlreadyExists = require("./utils/checkWhetherUserAlreadyExists");
const validateUsername = require("./utils/validateUsername");
const validatePassword = require("./utils/validatePassword");

const {
    PORT = 5000,
    NODE_ENV = "development",
    SESS_SECRET = "session secret",
    MONGODB_USER_PASSWORD = "u17FC7tjhKjtpM96"
} = process.env;

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESS_SECRET,
    secure: NODE_ENV === "production",
    store: new MongoDBStorage({
        uri: `mongodb+srv://worm:${MONGODB_USER_PASSWORD}@cluster0.s0yec.mongodb.net/tasklist?retryWrites=true&w=majority`,
        databaseName: "tasklist",
        collection: "session"
    }, (error) => { if (error) { console.log(error) } }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
    }
}));

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ['GET', 'PUT'],
    allowedHeaders: ['Content-Type', '*']
}));
app.use(express.json()); // parse req.body as json

// Static content when production
if (NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "client/build")));
}

// ROUTES //

app.get("/session", (req, res) => {
    res.json(req.session);
})

app.post("/auth/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username.length === 0 || password.length === 0) return res.status(400).json("Missing credentials");

        const isUserAlreadyExists = await checkWhetherUserAlreadyExists(username);
        if (isUserAlreadyExists) return res.status(400).json("User already exists. Try login")

        const hash = genHash(password);
        const dbData = await pool.query(`INSERT INTO users (username, password) VALUES ($1, $2)`, [username, hash]);
        res.status(201).json("You have succesfully signed up");
    } catch (error) {
        console.error(error.message);
    }
});

app.post("/auth/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (username.length === 0 || password.length === 0) return res.status(400).json("Missing credentials");

        const isUsernameValid = validateUsername(username);
        if (!isUsernameValid) return res.status(400).json("Username is not valid");

        const isPasswordValid = validatePassword(password);
        if (!isPasswordValid) return res.status(400).json("Password is not valid");

        const dbData = await pool.query("SELECT id, password FROM users WHERE username=$1", [username]);
        if (!dbData.rows[0]) return res.status(400).json("Username and password do not match");

        const userId = dbData.rows[0].id;
        const hash = dbData.rows[0].password;

        const isPasswordVerified = bcrypt.compareSync(password, hash);
        if (!isPasswordVerified) return res.status(400).json("Username and password do not match");

        req.session.user = { userId };

        res.status(200).json("You have successfully loged in");

    } catch (error) {
        console.error(error.message);
    }
})









// Get all tasks
app.get("/tasks", async (req, res) => {
    try {
        const allTasks = await pool.query(`
            SELECT 
                task.id as id, 
                description, 
                status_of_completion, 
                time_of_creation, 
                time_of_last_update, 
                date_and_time, 
                read_time, 
                folder.name as folder_name,
                folder.id as folder_id 
            FROM task
                LEFT JOIN folder ON folder.id = task.folder_id
            ORDER BY 
                time_of_creation DESC;
            `);
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
            name,
            color_id
        FROM
            folder;
        `);
        // Feedback to client
        res.json(allFolders.rows);
    } catch (error) {
        console.error(error.message);
    }
})

// Delete folder
app.delete("/folders/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const deleteTasks = await pool.query(`DELETE FROM task WHERE folder_id = $1;`, [id]);
        const deleteFolder = await pool.query(`DELETE FROM folder WHERE id = $1;`, [id]);
        // Feedback to client
        res.json("Folder has been deleted")
    } catch (error) {
        console.error(error.message);
    }
})

// Add new folder
app.post("/folders", async (req, res) => {
    try {
        const { folderName, colorId } = req.body;
        const addFolder = await pool.query(`
        INSERT INTO
            folder (name, color_id)
        VALUES
            ($1, $2);
        `,
            [folderName, colorId]);
        res.json(`Project «${folderName}» has been created`);
    } catch (error) {
        console.error(error.message);
    }
});

// Update folder

app.put("/folders/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const { folderName, colorId } = req.body;
        console.log(req.body);
        const updateFolder = await pool.query(`
            UPDATE
                folder
            SET
                name = $2,
                color_id = $3
            WHERE
                id = $1;`
            , [id, folderName, colorId]);
        // Feedback to client
        res.json("Project has been updated");
    } catch (error) {
        console.error(error.message);
    }
})

// Get colors

app.get("/colors", async (req, res) => {
    const colors = await pool.query(`
    SELECT
        id,
        name,
        label,
        font,
        fill
    FROM 
        color`);
    // Feedback to client
    res.json(colors.rows);
});


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
});