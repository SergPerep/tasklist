// Modules
const express = require("express");
const app = express();
const path = require("path");
const session = require("express-session");
const pgStorage = require("connect-pg-simple")(session);
const pool = require("./configs/dbConnection");
const handleErrors = require("./middlewares/handleErrors");
const requireAuth = require("./middlewares/requireAuth");
const logger = require("./utils/logger");
require("dotenv").config();
const enforce = require('express-sslify');
const morgan = require("morgan");

const {
    PORT = 5000,
    NODE_ENV = "development",
    SESS_SECRET = "session secret"
} = process.env;

// Redirect to https on heroku
if (NODE_ENV === "production") {
    app.use(enforce.HTTPS({ trustProtoHeader: true }))
}

app.use(morgan("tiny"));

app.use(session({
    store: new pgStorage({
        pool: pool
    }),
    resave: false,
    saveUninitialized: true,
    secret: SESS_SECRET,
    secure: NODE_ENV === "production",
    cookie: {
        maxAge: 1000 * 60 * 60 * 2, // 2 hours
    }
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

app.use("/auth", require("./components/auth/authAPI"));
app.use("/tasks", requireAuth, require("./components/tasks/tasksAPI"));
app.use("/folders", requireAuth, require("./components/folders/foldersAPI"));
app.use("/colors", require("./components/colors/colorsAPI"));
app.use("/users", require("./components/users/usersAPI"));

app.get('/*', (req, res) => {
    logger.info(path.join(__dirname, '/client/build/index.html'));
    res.sendFile(path.join(__dirname, '/client/build/index.html'), function (err) {
        if (err) res.status(500).send(err);
    })
})

app.use(handleErrors);

app.listen(PORT, () => {
    logger.info(`server started on port ${PORT}`)
});